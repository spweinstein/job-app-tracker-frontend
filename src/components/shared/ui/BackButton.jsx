import { useNavigate } from "react-router";

const BackButton = ({ onClick, size = "sm" }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={onClick ?? (() => navigate(-1))}
      className={`btn btn-${size} btn-secondary`}
    >
      ← Back
    </button>
  );
};

export default BackButton;