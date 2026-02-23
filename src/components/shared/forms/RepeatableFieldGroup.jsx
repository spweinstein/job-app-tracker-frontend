import React from "react";
import "./RepeatableFieldGroup.css";

const RepeatableFieldGroup = ({
  label,
  items,
  emptyItem,
  onItemsChange,
  renderItem,
  minItems = 0,
}) => {
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = items.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    onItemsChange(updated);
  };

  const handleAdd = () => {
    onItemsChange([...items, { ...emptyItem }]);
  };

  const handleRemove = (index) => {
    onItemsChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="repeatable-field-group">
      {label && <p className="repeatable-field-group__label">{label}</p>}
      <div className="repeatable-field-group__list">
        {items.map((item, index) => (
          <div key={index} className="repeatable-item">
            <div className="repeatable-item__fields">
              {renderItem(item, index, handleChange)}
            </div>
            {items.length > minItems && (
              <button
                type="button"
                className="btn btn-danger btn-sm repeatable-item__remove"
                onClick={() => handleRemove(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        className="btn btn-sm repeatable-field-group__add"
        onClick={handleAdd}
      >
        + Add {label}
      </button>
    </div>
  );
};

export default RepeatableFieldGroup;
