import { getResumes, deleteResume } from "../../services/resumeService.js";
import { Link, useNavigate } from "react-router";
import { PageContainer } from "../shared/layout/index.js";
import { DataTable } from "../shared/views/index.js";
import { DeleteButton, EditButton } from "../shared/ui/index.js";
import usePaginatedQuery from "../../hooks/usePaginatedQuery.js";
import { ListSearch } from "../shared/list/ListSearch.jsx";
import { ListPagination } from "../shared/list/ListPagination.jsx";
import useElementWidth from "../../hooks/useElementWidth.js";

const ResumeList = () => {
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
  } = usePaginatedQuery(getResumes);

  const handleDelete = async (resumeId) => {
    try {
      await deleteResume(resumeId);
      refresh();
    } catch (error) {
      // errors surfaced via hook
    }
  };

  const columns = [
    {
      key: "name",
      label: "Resume",
      sortable: true,
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
      minWidth: 400,
    },
    {
      key: "version",
      label: "Version",
      render: (row) =>
        row.version || "0",
      className: "col-hide-tablet",
      minWidth: 600
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
          <EditButton onClick={() => navigate(`/resumes/${row._id}/edit`)} size={tableWidth < 500 ? "icon" : "xs"} />
          <DeleteButton onClick={() => handleDelete(row._id)} size={tableWidth < 500 ? "icon" : "xs"} />
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
      errors={errors}
    >
      <ListSearch
        value={query}
        onChange={setQuery}
        placeholder="Search resumes…"
        total={total}
      />
      <DataTable
        columns={columns}
        data={data}
        sortField={sortField}
        sortDir={sortDir}
        onSort={toggleSort}
        emptyState={loading ? <p>Loading…</p> : <p>No resumes found.</p>}
      />
      <ListPagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </PageContainer>
  );
};

export default ResumeList;
