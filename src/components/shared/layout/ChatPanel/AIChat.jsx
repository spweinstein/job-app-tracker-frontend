import { useEffect, useRef, useState } from "react";
import { createThread, getThreadMessages, postThreadMessage } from "../../../../services/ai.js";
import { LoadingSpinner } from "../../ui/index.js";
import "./AIChat.css";

const AIChat = ({ docType=null, documentId=null }) => {
  const [threadId, setThreadId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingThread, setLoadingThread] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [assistantTyping, setAssistantTyping] = useState(false);
  const [error, setError] = useState(null);
  const [lastUserText, setLastUserText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {

    let cancelled = false;

    const initThread = async () => {
      setLoadingThread(true);
      setError(null);

      try {
        const res = await createThread({ docType, documentId });
        console.log(res);
        if (cancelled) return;

        const id =
          res.threadId ||
          res.thread?._id ||
          res._id ||
          null;

        if (!id) {
          throw new Error("Unable to start AI assistant thread.");
        }

        setThreadId(id);
        await loadMessages(id, { replace: true });
      } catch (e) {
        if (!cancelled) {
          setError(e.message || "Failed to start AI assistant.");
        }
      } finally {
        if (!cancelled) {
          setLoadingThread(false);
        }
      }
    };

    initThread();

    return () => {
      cancelled = true;
    };
  }, [docType, documentId]);

  const loadMessages = async (id, { replace = false } = {}) => {
    if (!id) return;
    setLoadingMessages(true);
    setError(null);

    try {
      const res = await getThreadMessages(id);
      const msgs = Array.isArray(res.messages) ? res.messages : res;
      setMessages((prev) => (replace ? msgs : [...prev, ...msgs]));
    } catch (e) {
      setError(e.message || "Failed to load messages.");
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages.length]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!threadId || sending) return;

    const text = inputValue.trim();
    if (!text) return;

    setSending(true);
    setAssistantTyping(true);
    setError(null);
    setInputValue("");
    setLastUserText(text);

    try {
      const res = await postThreadMessage(threadId, text);
      const userMessage = res.userMessage || res.user || null;
      const assistantMessage = res.assistantMessage || res.assistant || null;

      setMessages((prev) => [
        ...prev,
        ...(userMessage ? [userMessage] : []),
        ...(assistantMessage ? [assistantMessage] : []),
      ]);
    } catch (e) {
      setError(e.message || "Failed to send message.");
    } finally {
      setSending(false);
      setAssistantTyping(false);
    }
  };

  const handleRetry = async () => {
    if (!threadId || !lastUserText || sending) return;

    setInputValue(lastUserText);
    await handleSend(new Event("submit"));
  };

  const isDisabled = sending || loadingThread;

  return (
    <section className="ai-chat-panel">
      <header className="ai-chat-panel__header">
        <h2 className="ai-chat-panel__title">Assistant</h2>
        {(loadingThread || loadingMessages) && (
          <span className="ai-chat-panel__status">Loading…</span>
        )}
      </header>

      {error && (
        <div className="ai-chat-panel__error">
          <span>{error}</span>
          {lastUserText && (
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={handleRetry}
            >
              Retry
            </button>
          )}
        </div>
      )}

      <div className="ai-chat-panel__messages" ref={messagesEndRef}>
        {messages.length === 0 && !loadingMessages && (
          <p className="ai-chat-panel__empty">
            Ask anything about this {docType === "cover_letter" ? "cover letter" : "resume"}…
          </p>
        )}

        {messages.map((msg) => (
          <div
            key={msg._id || `${msg.role}-${msg.createdAt}`}
            className={`ai-chat-panel__message ai-chat-panel__message--${msg.role}`}
          >
            <div className="ai-chat-panel__message-meta">
              <span className="ai-chat-panel__message-role">
                {msg.role === "assistant" ? "Assistant" : "You"}
              </span>
              {msg.createdAt && (
                <span className="ai-chat-panel__message-time">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>
            <div className="ai-chat-panel__message-body">
              {msg.text}
            </div>
          </div>
        ))}

        {assistantTyping && (
          <div className="ai-chat-panel__assistant-typing">
            <LoadingSpinner size="xs" />
            <span>Assistant is thinking…</span>
          </div>
        )}
      </div>

      <form className="ai-chat-panel__composer" onSubmit={handleSend}>
        <textarea
          className="ai-chat-panel__input"
          placeholder="Ask a question about this document…"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isDisabled}
          rows={3}
        />
        <button
          type="submit"
          className="btn btn-primary ai-chat-panel__send"
          disabled={isDisabled || !inputValue.trim()}
        >
          {sending ? "Sending…" : "Send"}
        </button>
      </form>
    </section>
  );
};

export default AIChat;

