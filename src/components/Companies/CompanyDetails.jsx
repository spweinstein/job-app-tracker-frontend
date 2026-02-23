import { useState, useEffect } from "react";
import { getCompany, deleteCompany } from "../../services/companyService.js";
import { deleteApplication } from "../../services/applicationService.js";
import { useParams, useNavigate, Link } from "react-router";
import { PageContainer } from "../shared/layout";
import { DataTable } from "../shared/views/index.js";
import { DeleteButton } from "../shared/ui/index.js";
import "../shared/views/RecordDetails/RecordDetails.css";
import useErrors from "../../hooks/useErrors.js";

const CompanyDetails = () => {
  const [company, setCompany] = useState({ _id: null });
  const {errors, addError, clearErrors} = useErrors();
  const [relatedApplications, setRelatedApplications] = useState([]);
  const { companyId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await getCompany(companyId);
        setCompany(res);
      } catch (e) {
        addError(e.message);
      }
    };
    fetchCompany();
  }, [companyId]);

  const fetchRelatedApplications = async () => {
    try {
      const { api } = await import("../../services/api.js");
      const { data } = await api.get(`/applications?company=${companyId}`);
      setRelatedApplications(data.data || []);
    } catch (e) {
      addError(e.message);
    }
  };

  useEffect(() => {
    // Fetch related applications for this company

    if (companyId) {
      fetchRelatedApplications();
    }
  }, [companyId]);

  const handleDeleteCompany = async () => {
    try {
      await deleteCompany(companyId);
      navigate("/companies");
    } catch (e) {
      addError(e.message);
    }
  };

  const handleDeleteApplication = async (applicationId) => {
    try {
      await deleteApplication(applicationId);
    } catch (e) {
      addError(e.message);
    }
    fetchRelatedApplications();
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
      key: "title",
      label: "Position",
      render: (row) => row.title || "-",
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
        row.appliedAt ? new Date(row.appliedAt).toLocaleDateString() : "-",
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
          <DeleteButton onClick={() => handleDeleteApplication(row._id)} />
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
          <DeleteButton onClick={handleDeleteCompany} />
        </>
      }
      errors={errors}
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
