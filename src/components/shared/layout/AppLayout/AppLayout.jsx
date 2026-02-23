import { useContext } from "react";
import { Outlet } from "react-router";
import AppSidebar from "../AppSidebar/AppSidebar.jsx";
import "./AppLayout.css";
import { UserContext } from "../../../../contexts/UserContext.jsx";

const AppLayout = ({ sidebarOpen, onSidebarClose }) => {
  const { user } = useContext(UserContext);

  return (
    <div className={`app-layout${user ? " app-layout--has-sidebar" : ""}`}>
      {user && (
        <>
          {/* Translucent overlay — mobile only */}
          <div
            className={`sidebar-overlay${sidebarOpen ? " sidebar-overlay--visible" : ""}`}
            onClick={onSidebarClose}
            aria-hidden="true"
          />

          <aside className={`left-sidebar${sidebarOpen ? " left-sidebar--open" : ""}`}>
            <AppSidebar onNavigate={onSidebarClose} />
          </aside>
        </>
      )}

      <Outlet />
    </div>
  );
};

export default AppLayout;
