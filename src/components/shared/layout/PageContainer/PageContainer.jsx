import React from "react";
import "./PageContainer.css";

const PageContainer = ({ title, actions, children }) => (
  <main className="page-container">
    <header className="page-header">
      <h1>{title}</h1>
      {actions && <div className="page-header__actions">{actions}</div>}
    </header>
    <section className="page-content">{children}</section>
  </main>
);
export default PageContainer;
