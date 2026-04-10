import { useNavigate } from "react-router";
import "./NotFound.css";
import { BackButton } from "../shared/ui/index.js";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      {/* Back button */}
      <BackButton onClick={() => navigate(-1)} />
    </div>
  );
};

export default NotFound;
