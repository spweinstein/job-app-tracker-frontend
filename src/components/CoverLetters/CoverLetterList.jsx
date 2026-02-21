import { useState, useEffect } from "react";
import {
  getCoverLetters,
  deleteCoverLetter,
} from "../../services/coverLetterService.js";
import { Link, useNavigate } from "react-router";
import { PageContainer } from "../shared/layout/index.js";
import { DataTable } from "../shared/views/index.js";

const CoverLetterList = () => {
  const [coverLetters, setCoverLetters] = useState([]);
  const navigate = useNavigate();

  const fetchCoverLetters = async () => {
    const res = await getCoverLetters();
    setCoverLetters(res);
  };

  useEffect(() => {
    fetchCoverLetters();
  }, []);

  const handleDelete = async (coverLetterId) => {
    try {
      await deleteCoverLetter(coverLetterId);
      fetchCoverLetters();
    } catch (error) {
      console.error(`[handleDelete error]: ${error.message}`);
    }
  };

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (row) => (
        <Link to={`/cover-letters/${row._id}`}>{row.name || "Untitled"}</Link>
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
            onClick={() => navigate(`/cover-letters/${row._id}/edit`)}
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
      title="Cover Letters"
      actions={
        <Link to="/cover-letters/new" className="btn btn-lg btn-primary">
          Create
        </Link>
      }
    >
      <DataTable
        columns={columns}
        data={coverLetters}
        emptyState={<p>No cover letters found.</p>}
      />
    </PageContainer>
  );
};

export default CoverLetterList;
