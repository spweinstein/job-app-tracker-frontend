import { useState } from "react";
import AIChat from "./AIChat.jsx";
import "./ChatPanel.css";

const SECTIONS = [
  { key: "assistant", label: "Assistant" },
  // You can add more panels here later, e.g. history, notes, etc.
  // { key: "history", label: "History" },
];

const ChatPanel = () => {
  const [activeSection, setActiveSection] = useState("assistant");

  const SECTION_CONTENT = {
    assistant: <AIChat />,
    // history: <ChatHistory docType={docType} documentId={documentId} />,
  };

  return (
    <aside className="chat-panel">
      <ul className="chat-tabs">
        {SECTIONS.map((section) => (
          <li key={section.key}>
            <button
              type="button"
              className={
                "chat-tab" +
                (activeSection === section.key ? " chat-tab--active" : "")
              }
              onClick={() => setActiveSection(section.key)}
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="chat-panel__section">
        {SECTION_CONTENT[activeSection]}
      </div>
    </aside>
  );
};

export default ChatPanel;
