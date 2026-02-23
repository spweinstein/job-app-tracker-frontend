import { useEffect } from "react";
import {
  getCoverLetters,
  deleteCoverLetter,
} from "../../services/coverLetterService.js";
import { Link, useNavigate } from "react-router";
import { DataTable } from "../shared/views/index.js";
import { DeleteButton, EditButton } from "../shared/ui/index.js";
import usePaginatedQuery from "../../hooks/usePaginatedQuery.js";
import { ListSearch } from "../shared/list/ListSearch.jsx";
import { ListPagination } from "../shared/list/ListPagination.jsx";

const CoverLetterList = ({ setHeader = () => {} }) => {
  const navigate = useNavigate();

  const {
    data,
    total,
    totalPages,
    loading,
    errors,
    query,
    setQuery,
    sortField,
    sortDir,
    toggleSort,
    page,
    setPage,
    refresh,
  } = usePaginatedQuery(getCoverLetters);

  useEffect(() => {
    setHeader({
      title: "Cover Letters",
      actions: (
        <Link to="/cover-letters/new" className="btn btn-lg btn-primary">
          Create
        </Link>
      ),
    });
  }, []);

  const handleDelete = async (coverLetterId) => {
    try {
      await deleteCoverLetter(coverLetterId);
      refresh();
    } catch (error) {
      // errors surfaced via hook
    }
  };

  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (row) => (
        <Link to={`/cover-letters/${row._id}`}>{row.name || "Untitled"}</Link>
      ),
    },
    {
      key: "parent",
      label: "Parent",
      render: (row) =>
        row.parent ? (
          <Link to={`/cover-letters/${row.parent._id}`}>
            {row.parent.name || "Untitled"}
          </Link>
        ) : (
          "---"
        ),
      minWidth: 400,
    },
    {
      key: "version",
      label: "Version",
      render: (row) => row.version || "0",
      minWidth: 600,
    },
    {
      key: "updatedAt",
      label: "Last Updated",
      sortable: true,
      render: (row) =>
        row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : "-",
    },
    {
      key: "actions",
      label: "Actions",
      isActions: true,
      render: (row, {tableWidth}) => (
        <div className="actions">
          <EditButton onClick={() => navigate(`/cover-letters/${row._id}/edit`)} size={tableWidth < 500 ? "icon" : "xs"} />
          <DeleteButton onClick={() => handleDelete(row._id)} size={tableWidth < 500 ? "icon" : "xs"} />
        </div>
      ),
    },
  ];

  return (
    <>
      <ListSearch
        value={query}
        onChange={setQuery}
        placeholder="Search cover letters…"
        total={total}
      />
      <DataTable
        columns={columns}
        data={data}
        sortField={sortField}
        sortDir={sortDir}
        onSort={toggleSort}
        emptyState={loading ? <p>Loading…</p> : <p>No cover letters found.</p>}
      />
      <ListPagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
};

export default CoverLetterList;
