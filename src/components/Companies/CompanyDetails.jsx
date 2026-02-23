import { useState, useEffect } from "react";
import { getCompany, deleteCompany } from "../../services/companyService.js";
import { deleteApplication } from "../../services/applicationService.js";
import { useParams, useNavigate, Link } from "react-router";
import { DataTable } from "../shared/views/index.js";
import { DeleteButton, EditButton, BackButton } from "../shared/ui/index.js";
import DetailsCard from "../shared/views/DetailsCard/DetailsCard.jsx";
import useErrors from "../../hooks/useErrors.js";
import { LoadingSpinner } from "../shared/ui/index.js";

const CompanyDetails = ({ setHeader = () => {} }) => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
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

  useEffect(() => {
    setHeader({
      title: "Company Details",
      actions: (
        <>
          <BackButton onClick={() => navigate(-1)} />
          <EditButton onClick={() => navigate(`/companies/${companyId}/edit`)} />
          <DeleteButton onClick={handleDeleteCompany} />
        </>
      ),
    });
  }, [companyId]);

  if (loading) return <LoadingSpinner />;
  if (!company?._id) return <h3>Company Not Found</h3>;

  const applicationColumns = [
    {
      key: "title",
      label: "Job Title",
      sortable: true,
      render: (row) => (
        <Link to={`/applications/${row._id}`}>{row.title || "Untitled"}</Link>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span className={`status status-${row.status?.toLowerCase()}`}>
          {row.status}
        </span>
      ),
      minWidth: 400,
    },
    {
      key: "priority",
      label: "Priority",
      render: (row) => (
        <span className={`priority priority-${row.priority?.toLowerCase()}`}>
          {row.priority}
        </span>
      ),
      minWidth: 600,
    },
    {
      key: "source",
      label: "Source",
      render: (row) => row.source || "-",
      minWidth: 800,
    },
    {
      key: "updatedAt",
      label: "Last Updated",
      render: (row) =>
        row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : "-",
    },
    {
      key: "actions",
      label: "Actions",
      isActions: true,
      render: (row, {tableWidth}) => (
        <div className="actions">
          <EditButton onClick={() => navigate(`/applications/${row._id}/edit`)} size={tableWidth < 500 ? "icon" : "xs"} />
          <DeleteButton onClick={() => handleDeleteApplication(row._id)} size={tableWidth < 500 ? "icon" : "xs"} />
        </div>
      ),
    },
  ];

  return (
    <>
      {errors.length > 0 && (
        <div id="error-message">{errors.map((e) => <p key={e}>{e}</p>)}</div>
      )}
      <DetailsCard
        title={{ label: "Company", value: company.name }}
        fields={[
          { label: "Website", value: company.url ? (
            <a href={company.url} target="_blank" rel="noopener noreferrer">
              {company.url}
            </a>
          ) : null },
          { label: "Description", value: company.description || null },
          { label: "Notes",       value: company.notes       || null },
        ]}
      />
      <h2>Job Applications</h2>
      <DataTable
        columns={applicationColumns}
        data={relatedApplications}
        emptyState={<p>No applications for this company.</p>}
        sortField="updatedAt"
        sortDir="desc"
      />
    </>
  );
};

export default CompanyDetails;
