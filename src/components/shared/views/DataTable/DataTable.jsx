import "./DataTable.css";
import useMediaQuery from "../../../../hooks/useMediaQuery.js";
import useElementWidth from "../../../../hooks/useElementWidth.js";

const DataTable = ({ columns, data, emptyState, sortField, sortDir, onSort }) => {
  const [setElement, width] = useElementWidth();  
  if (!data?.length) return emptyState ?? null;

  const dataCols = columns.filter((col) => !col.isActions);
  const numDataCols = dataCols.length;

  const filterColumn = (col) => {
    // Takes column and returns true if it should be visible on the given screen size
    if (col.minWidth && col.minWidth > width) return false;
    return true;
  };

  const visibleColumns = columns.filter(filterColumn);

  return (
    <>
    {/* <p>Table width: {width}px</p> */}
    <div className="table-container" style={{ "--table-data-cols": visibleColumns.length - 1 }} ref={setElement}>
      
      <div className="table-header">
        {visibleColumns.map((col) =>
          col.sortable && onSort ? (
            <div key={col.key}>
              <a
                className="sort-header"
                onClick={() => onSort(col.key)}
                {...(sortField === col.key ? { active: "" } : {})}
              >
                {col.label}
                {sortField === col.key && (
                  <span className="sort-icon">
                    {sortDir === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </a>
            </div>
          ) : (
            <div key={col.key}>{col.label}</div>
          )
        )}
      </div>
      <div className="table-body">
        {data.map((row) => {
          const context = {tableWidth: width};
          return (
            <div className="table-row" key={row._id}>
              {visibleColumns.map((col) => (
                <div key={col.key} data-label={col.label}>
                  {col.render(row, context)}
                </div>
              ))}
              
            </div>
          )
        })}
      </div>
    </div>
    </>
  
  );
};

export default DataTable;