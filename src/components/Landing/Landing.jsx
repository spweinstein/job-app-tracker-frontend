import { Link } from "react-router";
import "./Landing.css";

function Landing() {
  return (
    <main className="landing">
      <section className="landing__banner" aria-labelledby="landing-heading">
        <div className="landing__banner-glow" aria-hidden />
        <div className="landing__banner-inner">
          <p className="landing__eyebrow">Job search, organized</p>
          <h1 id="landing-heading" className="landing__title">
            One place for every application
          </h1>
          <p className="landing__lead">
            Track companies, applications, resumes, and cover letters without the
            spreadsheet chaos—so you can focus on landing the role.
          </p>

          <div className="landing__actions">
            <Link className="btn btn-primary landing__cta-primary" to="/register">
              Create account
            </Link>
            <Link className="btn btn-secondary landing__cta-secondary" to="/login">
              Sign in
            </Link>
          </div>

          <ul className="landing__highlights" aria-label="Features">
            <li>Pipeline at a glance</li>
            <li>Tailored materials per company</li>
            <li>Pick up on any device</li>
          </ul>

          <p className="landing__hint">
            Signed in? Head home for your dashboard.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Landing;
