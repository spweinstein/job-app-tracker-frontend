import { useContext } from "react";
import { Outlet } from "react-router";
import AppSidebar from "../AppSidebar/AppSidebar.jsx";
import ChatPanel from "../ChatPanel/ChatPanel.jsx";
import "./AppLayout.css";
import { UserContext } from "../../../../contexts/UserContext.jsx";

const AppLayout = ({
  sidebarOpen,
  onSidebarClose,
  chatOpen,
  onChatClose,
  isAiAssistantEnabled,
}) => {
  const { user } = useContext(UserContext);

  return (
    <div
      className={
        "app-layout" +
        (user ? " app-layout--has-sidebar" : "") +
        (chatOpen && isAiAssistantEnabled ? " app-layout--has-chat" : "")
      }
    >
      {user && (
        <>
          {/* Left sidebar (nav) */}
          <div
            className={
              "sidebar-overlay" +
              (sidebarOpen ? " sidebar-overlay--visible" : "")
            }
            onClick={onSidebarClose}
            aria-hidden="true"
          />

          <aside
            className={
              "left-sidebar" + (sidebarOpen ? " left-sidebar--open" : "")
            }
          >
            <AppSidebar onNavigate={onSidebarClose} />
          </aside>

          <main className="app-layout__main">
            <Outlet />
          </main>

          {/* Right sidebar (global chat) */}
          {isAiAssistantEnabled && (
            <aside
              className={
                "right-sidebar" + (chatOpen ? " right-sidebar--open" : "")
              }
            >
              <ChatPanel onClose={onChatClose} />
            </aside>
          )}
        </>
      )}
    </div>
  );
};

export default AppLayout;
