import React from "react";
import "./PageContainer.css";

const PageContainer = ({ title, actions, children, errors }) => (
  <main className="page-container">
    <header className="page-header">
      <h1>{title}</h1>
      {actions && <div className="page-header__actions">{actions}</div>}
    </header>
    {errors && <div id="error-message">{
      /*
      Map through errors object and return a list of error messages
      */
      errors.map((error) => (
        <p key={error}>{error}</p>
      ))
    }</div>}

    <section className="page-content">{children}</section>
  </main>
);
export default PageContainer;
