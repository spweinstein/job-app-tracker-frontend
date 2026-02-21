import { useState, useEffect } from "react";
import {
  deleteApplication,
  getApplications,
} from "../../services/applicationService.js";
import { Link, useNavigate } from "react-router";
import { PageContainer } from "../shared/layout/index.js";
import { DataTable } from "../shared/views/index.js";

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const fetchApplications = async () => {
    const res = await getApplications();
    setApplications(res ?? []);
  };
  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDelete = async (applicationId) => {
    try {
      await deleteApplication(applicationId);
      fetchApplications();
    } catch (error) {
      console.error(`[handleDelete error]: ${error.message}`);
    }
  };

  const columns = [
    {
      key: "title",
      label: "Job Title",
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
    },
    {
      key: "priority",
      label: "Priority",
      render: (row) => (
        <span className={`priority priority-${row.priority?.toLowerCase()}`}>
          {row.priority}
        </span>
      ),
    },
    {
      key: "source",
      label: "Source",
      render: (row) => row.source || "-",
    },
    {
      key: "actions",
      label: "Actions",
      isActions: true,
      render: (row) => (
        <div className="actions">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => navigate(`/applications/${row._id}/edit`)}
          >
            Edit
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
      title="Applications"
      actions={
        <Link to="/applications/new" className="btn btn-lg btn-primary">
          Create
        </Link>
      }
    >
      <DataTable
        columns={columns}
        data={applications}
        emptyState={<p>No applications found.</p>}
      />
    </PageContainer>
  );
};

export default ApplicationList;
