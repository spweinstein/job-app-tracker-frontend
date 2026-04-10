import { useEffect, useCallback } from "react";
import {
  getCoverLetters,
  deleteCoverLetter,
} from "../../services/coverLetterService.js";
import { Link, useNavigate, useOutletContext } from "react-router";
import { DataTable } from "../shared/views/index.js";
import {
  DeleteButton,
  EditButton,
  LoadingSpinner,
} from "../shared/ui/index.js";
import usePaginatedQuery from "../../hooks/usePaginatedQuery.js";
import { ListSearch } from "../shared/list/ListSearch.jsx";
import { ListPagination } from "../shared/list/ListPagination.jsx";
import useErrors from "../../hooks/useErrors.js";

const CoverLetterList = () => {
  const { setHeader = () => {} } = useOutletContext() ?? {};
  const navigate = useNavigate();

  const { params, setParams, response, setFilter, toggleSort, refresh } =
    usePaginatedQuery(getCoverLetters, {
      page: 1,
      limit: 10,
      sort: "updatedAt",
      sortDir: "desc",
    });
  const { errors, addError, clearErrors } = useErrors();

  useEffect(() => {
    setHeader({
      title: "Cover Letters",
      actions: (
        <Link to="/cover-letters/new" className="btn btn-lg btn-primary">
          Create
        </Link>
      ),
    });
  }, [setHeader, navigate]);

  const handleDelete = useCallback(
    async (coverLetterId) => {
      try {
        clearErrors();
        await deleteCoverLetter(coverLetterId);
        refresh();
      } catch (error) {
        // errors surfaced via hook
        addError(error.message);
      }
    },
    [refresh, addError, clearErrors],
  );

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
      render: (row, { tableWidth }) => (
        <div className="actions">
          <EditButton
            onClick={() => navigate(`/cover-letters/${row._id}/edit`)}
            size={tableWidth < 500 ? "icon" : "xs"}
          />
          <DeleteButton
            onClick={() => handleDelete(row._id)}
            size={tableWidth < 500 ? "icon" : "xs"}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {errors.length > 0 && (
        <div className="error-message">
          {errors.map((e) => (
            <p key={e}>{e}</p>
          ))}
        </div>
      )}
      <ListSearch
        value={params.q}
        onChange={setFilter}
        placeholder="Search cover letters…"
        total={response.total}
      />
      {response.loading ? (
        <LoadingSpinner />
      ) : (
        <DataTable
          columns={columns}
          data={response.data}
          sortField={params.sort}
          sortDir={params.sortDir}
          onSort={toggleSort}
          emptyState={<p>No cover letters found.</p>}
        />
      )}
      <ListPagination
        page={params.page}
        totalPages={response.totalPages}
        onPageChange={(page) => setParams({ ...params, page })}
      />
    </>
  );
};

export default CoverLetterList;
