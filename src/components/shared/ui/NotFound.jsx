import { useNavigate } from "react-router";
import "./NotFound.css";
import BackButton from "./BackButton.jsx";

const NotFound = ({ message, title = "404 - Page Not Found" }) => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <div className="not-found__content">
        <h1 className="not-found__title">{title}</h1>
        <p className="not-found__message">
          {message || "The page you are looking for does not exist."}
        </p>
        <div className="not-found__actions">
          <BackButton onClick={() => navigate(-1)} size="md" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
