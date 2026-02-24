import { isValidElement } from "react";
import "./DetailsCard.css";

/**
 * Returns true if the prop is a plain { label, value } descriptor object
 * (as opposed to a string, number, or React element).
 */
const isFieldObj = (prop) =>
  prop != null && typeof prop === "object" && !isValidElement(prop) && "label" in prop;

/**
 * Renders a header slot: as a labeled card-field row when given { label, value },
 * or as a plain styled div otherwise.
 */
const HeaderSlot = ({ prop, defaultClass }) => {
  if (!prop) return null;
  if (isFieldObj(prop)) {
    return (
      <div className="card-field">
        <strong>{prop.label}</strong>
        <span>{prop.value}</span>
      </div>
    );
  }
  return <div className={defaultClass}>{prop}</div>;
};

/**
 * DetailsCard — standard detail view for a single record.
 *
 * @param {ReactNode|{label,value}} title      Primary header slot
 * @param {ReactNode|{label,value}} subtitle   Secondary header slot
 * @param {Array}                   fields     [{ label: string, value: ReactNode }]
 *                                             Fields whose value is null or undefined are hidden.
 * @param {string}                  className  Optional extra class on the outer card div
 * @param {ReactNode}               children   Free-form content below the field list
 */
const DetailsCard = ({ title, subtitle, fields = [], className = "", children }) => (
  <div className={`card ${className}`.trim()}>

    {(title || subtitle) && (
      <div className="card-header">
        <HeaderSlot prop={title}    defaultClass="card-title" />
        <HeaderSlot prop={subtitle} defaultClass="card-subtitle" />
      </div>
    )}

    {fields
      .filter(({ value }) => value !== null && value !== undefined)
      .map(({ label, value }) => (
        <div className="card-field" key={label}>
          <strong>{label}</strong>
          <span>{value}</span>
        </div>
      ))}

    {children}

  </div>
);

export default DetailsCard;
