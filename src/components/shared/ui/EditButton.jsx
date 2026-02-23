const EditButton = ({ onClick, size = "sm" }) => {

    const handleClick = (e) => {
        onClick(e);
    };

  return (
    <button className={`btn btn-primary ${size?"btn-"+size:""}`} onClick={handleClick}>
      {size === "icon" ? "✏️" : "Edit"}
    </button>
  );
};

export default EditButton;