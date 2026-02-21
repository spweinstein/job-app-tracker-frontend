import { Link } from "react-router";
import "./DataTable.css";

const DataTable = ({ columns, data, emptyState }) => {
  if (!data?.length) return emptyState ?? null;

  const dataCols = columns.filter((col) => !col.isActions).length;

  return (
    <div className="table-container" style={{ "--table-data-cols": dataCols }}>
      <div className="table-header">
        {columns.map((col) => (
          <div key={col.key}>{col.label}</div>
        ))}
      </div>
      <div className="table-body">
        {data.map((row) => (
          <div className="table-row" key={row._id}>
            {columns.map((col) => (
              <div key={col.key} data-label={col.label}>
                {col.render(row)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataTable;
