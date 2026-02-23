import "./SubmitButton.css";
import LoadingSpinner from "./LoadingSpinner.jsx";

const SubmitButton = ({ 
  children, 
  loading = false, 
  disabled = false,
  size = "md"
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type="submit"
      className={`btn btn-primary btn-${size} submit-button ${loading ? "submit-button--loading" : ""}`}
      disabled={isDisabled}
      aria-busy={loading}
      aria-disabled={isDisabled}
    >
      {loading ? (
        <>
          <LoadingSpinner size="sm" />
          <span className="submit-button__text">Saving…</span>
        </>
      ) : (
        <span className="submit-button__text">{children}</span>
      )}
    </button>
  );
};

export default SubmitButton;
