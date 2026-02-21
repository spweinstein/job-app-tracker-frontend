import { useState, useEffect } from "react";
import { getResumes, deleteResume } from "../../services/resumeService.js";
import { Link, useNavigate } from "react-router";
import { PageContainer } from "../shared/layout/index.js";
import { DataTable } from "../shared/views/index.js";

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();

  const fetchResumes = async () => {
    const res = await getResumes();
    setResumes(res);
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleDelete = async (resumeId) => {
    try {
      await deleteResume(resumeId);
      fetchResumes();
    } catch (error) {
      console.error(`[handleDelete error]: ${error.message}`);
    }
  };

  const columns = [
    {
      key: "name",
      label: "Resume",
      render: (row) => (
        <Link to={`/resumes/${row._id}`}>{row.name || "Untitled"}</Link>
      ),
    },
    {
      key: "parent",
      label: "Parent",
      render: (row) =>
        row.parent ? (
          <Link to={`/resumes/${row.parent._id}`}>
            {row.parent.name || "Untitled"}
          </Link>
        ) : (
          "---"
        ),
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
      render: (row) => (
        <div className="actions">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => navigate(`/resumes/${row._id}/edit`)}
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
      title="Resumes"
      actions={
        <Link to="/resumes/new" className="btn btn-lg btn-primary">
          Create
        </Link>
      }
    >
      <DataTable
        columns={columns}
        data={resumes}
        emptyState={<p>No resumes found.</p>}
      />
    </PageContainer>
  );
};

export default ResumeList;
