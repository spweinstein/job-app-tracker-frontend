import { useNavigate } from "react-router";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
    </div>
  );
};

export default NotFound;
