import { useState, useEffect } from "react";
import { getCompany, deleteCompany } from "../../services/companyService.js";
import { useParams, useNavigate, Link } from "react-router";
import { PageContainer } from "../shared/layout";
import { DataTable } from "../shared/views/index.js";
import "../shared/views/RecordDetails/RecordDetails.css";

const CompanyDetails = () => {
  const [company, setCompany] = useState({ _id: null });
  const [relatedApplications, setRelatedApplications] = useState([]);
  const { companyId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await getCompany(companyId);
        setCompany(res);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCompany();
  }, [companyId]);

  useEffect(() => {
    // Fetch related applications for this company
    const fetchRelatedApplications = async () => {
      try {
        const { api } = await import("../../services/api.js");
        const { data } = await api.get(`/applications?company=${companyId}`);
        setRelatedApplications(data || []);
      } catch (e) {
        console.log(e);
      }
    };
    if (companyId) {
      fetchRelatedApplications();
    }
  }, [companyId]);

  const handleDeleteClick = async () => {
    await deleteCompany(companyId);
    navigate("/companies");
  };

  if (company?._id === null) {
    return <h3>Loading...</h3>;
  }

  if (!company?.name) {
    return <h3>Company Not Found</h3>;
  }

  const actions = [,];

  const applicationColumns = [
    {
      key: "position",
      label: "Position",
      render: (row) => row.position || "-",
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={`status-badge status-badge--${row.status?.toLowerCase()}`}
        >
          {row.status || "-"}
        </span>
      ),
    },
    {
      key: "appliedDate",
      label: "Applied",
      render: (row) =>
        row.appliedDate ? new Date(row.appliedDate).toLocaleDateString() : "-",
    },
    {
      key: "actions",
      label: "Actions",
      isActions: true,
      render: (row) => (
        <div className="actions">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => navigate(`/applications/${row._id}`)}
          >
            View
          </button>
          <button
            className="btn btn-sm btn-warning"
            onClick={() => handleDelete(row._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <PageContainer
      title="Company Details"
      actions={
        <>
          <Link
            to={`/companies/${companyId}/edit`}
            className="btn btn-primary btn-sm"
          >
            Edit
          </Link>
          <button onClick={handleDeleteClick} className="btn btn-danger btn-sm">
            Delete
          </button>
        </>
      }
    >
      <div className="details-container">
        <div className="card">
          <div className="card-header">
            <div className="card-field">
              <strong>Company:</strong> {company.name}
            </div>
          </div>
          {company.description && (
            <div className="card-field">
              <strong>Description:</strong> <p>{company.description}</p>
            </div>
          )}
          {company.notes && (
            <div className="card-field">
              <strong>Notes:</strong> <p>{company.notes}</p>
            </div>
          )}
          {company.url && (
            <div className="card-field">
              <strong>Link:</strong>{" "}
              <a href={company.url} target="_blank" rel="noopener noreferrer">
                Website
              </a>
            </div>
          )}
        </div>
        <br></br>
        <h2>Job Applications</h2>
        <DataTable
          columns={applicationColumns}
          data={relatedApplications}
          emptyState={<p>No applications for this company.</p>}
        />
      </div>
    </PageContainer>
  );
};

export default CompanyDetails;
