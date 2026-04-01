import { useEffect, useCallback } from "react";
import {
  deleteApplication,
  getApplications,
} from "../../services/applicationService.js";
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

const ApplicationList = ({
  filterColumn,
  filterId,
  initialParams = {},
  isEmbedded = false,
}) => {
  const { addError, clearErrors } = useErrors();
  const { setHeader = () => {} } = useOutletContext() ?? {};
  const navigate = useNavigate();
  useEffect(() => {
    if (isEmbedded) return;
    setHeader({
      title: "Applications",
      actions: (
        <Link to="/applications/new" className="btn btn-lg btn-primary">
          Create
        </Link>
      ),
    });
  }, [isEmbedded, setHeader]);

  const { q, params, setParams, response, setFilter, toggleSort, refresh } =
    usePaginatedQuery(getApplications, {
      page: 1,
      limit: 10,
      sort: "updatedAt",
      sortDir: "asc",
      ...initialParams,
    });

  const handleDelete = useCallback(
    async (applicationId) => {
      try {
        clearErrors();
        await deleteApplication(applicationId);
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
      key: "title",
      label: "Job Title",
      sortable: true,
      render: (row) => (
        <Link to={`/applications/${row._id}`}>{row.title || "Untitled"}</Link>
      ),
    },
    {
      key: "company",
      label: "Company",
      render: (row) =>
        row?.company?._id ? (
          <Link to={`/companies/${row.company._id}`}>
            {row.company?.name || "Untitled"}
          </Link>
        ) : (
          <span>{row.company?.name || "---"}</span>
        ),
      minWidth: 400,
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
      minWidth: 900,
    },
    {
      key: "updatedAt",
      label: "Last Updated",
      sortable: true,
      render: (row) =>
        row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : "-",
      minWidth: 750,
    },
    {
      key: "appliedAt",
      label: "Applied",
      sortable: true,
      render: (row) =>
        row.appliedAt ? new Date(row.appliedAt).toLocaleDateString() : "-",
    },
    {
      key: "actions",
      label: "Actions",
      isActions: true,
      render: (row, { tableWidth }) => (
        <div className="actions">
          <EditButton
            onClick={() => navigate(`/applications/${row._id}/edit`)}
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
      <ListSearch
        value={q}
        onChange={setFilter}
        placeholder="Search applications…"
        total={response.total}
      />

      {response.loading ? (
        <LoadingSpinner />
      ) : (
        <DataTable
          columns={columns.filter(
            (col) =>
              !filterColumn ||
              col.key !== filterColumn ||
              col.value === filterId,
          )}
          data={response.data}
          sortField={params.sort}
          sortDir={params.sortDir}
          onSort={toggleSort}
          emptyState={<p>No applications found.</p>}
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

export default ApplicationList;
