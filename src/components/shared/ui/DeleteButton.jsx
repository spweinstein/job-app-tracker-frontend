const DeleteButton = ({ onClick, size = "sm" }) => {

    const handleClick = (e) => {
        e.preventDefault();
        if(window.confirm("Are you sure you want to delete this item?")){
            onClick(e);
        }
    };

  return (
    <button className={`btn btn-danger ${size?"btn-"+size:""}`} onClick={handleClick}>
      {size === "icon" ? "🗑️" : "Delete"}
    </button>
  );
};

export default DeleteButton;