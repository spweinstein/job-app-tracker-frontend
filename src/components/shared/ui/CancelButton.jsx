import "./CancelButton.css";

const CancelButton = ({ 
  children = "Cancel", 
  onClick,
  disabled = false,
  size = "md"
}) => {
  return (
    <button
      type="button"
      className={`btn btn-secondary btn-${size} cancel-button`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CancelButton;
