import { useState, useEffect } from "react";
import "./SearchableSelect.css";

// Normalize: accept a string ID or a populated { _id, name } object
const normalize = (value) => {
  if (value && typeof value === "object") {
    return { id: value._id ?? "", label: value.name ?? "" };
  }
  return { id: value ?? "", label: "" };
};

const SearchableSelect = ({
  name,
  value,           // string ID  OR  { _id, name } object — both accepted
  loadOptions,
  onChange,
  required,
  placeholder = "Select…",
}) => {
  const [open, setOpen]             = useState(false);
  const [query, setQuery]           = useState("");
  const [items, setItems]           = useState([]);
  const [selectedLabel, setSelectedLabel] = useState("");

  const { id: resolvedId, label: objectLabel } = normalize(value);

  // Prefer label derived from the object prop (edit forms with populated data);
  // fall back to the label the user last selected from the dropdown.
  const displayLabel = objectLabel || selectedLabel;

  useEffect(() => {
    if (open) {
      loadOptions("").then(setItems);
    }
  }, [open]);

  const handleQueryChange = (e) => {
    const q = e.target.value;
    setQuery(q);
    loadOptions(q).then(setItems);
  };

  const handleSelect = (optValue, optLabel) => {
    onChange({ target: { name, value: optValue } }); // always emits string ID
    setSelectedLabel(optLabel);
    setOpen(false);
    setQuery("");
  };

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setOpen(false);
      setQuery("");
    }
  };

  return (
    <div className="searchable-select" onBlur={handleBlur}>
      <input type="hidden" name={name} value={resolvedId} required={required} />

      <div
        className="searchable-select__trigger"
        onClick={() => setOpen((o) => !o)}
        tabIndex={0}
      >
        <span className={displayLabel ? "" : "searchable-select__placeholder"}>
          {displayLabel || placeholder}
        </span>
        <span>{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div className="searchable-select__dropdown">
          <input
            autoFocus
            className="searchable-select__search"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search…"
          />
          <ul>
            {items?.length === 0 && (
              <li className="searchable-select__empty">No results</li>
            )}
            {items?.map(({ value: v, label }) => (
              <li
                key={v}
                className={`searchable-select__option${v === resolvedId ? " searchable-select__option--selected" : ""}`}
                onMouseDown={() => handleSelect(v, label)}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;