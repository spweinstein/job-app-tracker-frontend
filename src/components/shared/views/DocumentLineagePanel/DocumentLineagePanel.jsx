import { Link } from "react-router";
import "./DocumentLineagePanel.css";
import "./DocumentLineagePanel.css";

/**
 * @param {object} document   - The current document, with parent + children populated
 * @param {string} basePath   - e.g. "/resumes" or "/cover-letters"
 */
const DocumentLineagePanel = ({ document, basePath }) => {
  if (!document?._id) return null;

  const children = document.children ?? [];

  return (
    <div className="lineage-panel">
      <div className="lineage-panel__header">Versions</div>

      {document.parent && (
        <div className="lineage-panel__section">
          <span className="lineage-panel__label">Parent</span>
          <Link to={`${basePath}/${document.parent._id}`} className="lineage-panel__link">
            ↑ {document.parent.name || "Untitled"}
          </Link>
        </div>
      )}

      {children.length > 0 && (
        <div className="lineage-panel__section">
          <span className="lineage-panel__label">
            Derived Versions ({children.length})
          </span>
          <ul className="lineage-panel__list">
            {children.map((child) => (
              <li key={child._id} className="lineage-panel__item">
                <Link to={`${basePath}/${child._id}`} className="lineage-panel__link">
                  {child.name || "Untitled"}
                </Link>
                {child.updatedAt && (
                  <span className="lineage-panel__date">
                    {new Date(child.updatedAt).toLocaleDateString()}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="lineage-panel__actions">
        <Link
          to={`${basePath}/new?parentId=${document._id}`}
          className="btn btn-sm btn-primary"
        >
          + New Version
        </Link>
      </div>
    </div>
  );
};

export default DocumentLineagePanel;