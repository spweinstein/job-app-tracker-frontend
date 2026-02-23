import { useEffect } from "react";
import {
  deleteApplication,
  getApplications,
} from "../../services/applicationService.js";
import { Link, useNavigate } from "react-router";
import { PageContainer } from "../shared/layout/index.js";
import { DataTable } from "../shared/views/index.js";
import { DeleteButton, EditButton, LoadingSpinner } from "../shared/ui/index.js";
import usePaginatedQuery from "../../hooks/usePaginatedQuery.js";
import { ListSearch } from "../shared/list/ListSearch.jsx";
import { ListPagination } from "../shared/list/ListPagination.jsx";

const ApplicationList = ({setHeader = () => {}}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (setHeader && typeof setHeader === "function") {
    setHeader({
      title: "Applications",
      actions: <Link to="/applications/new" className="btn btn-lg btn-primary">Create</Link>,
    });
    }
  }, []);

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
  } = usePaginatedQuery(getApplications, { defaultSort: "updatedAt" });

  const handleDelete = async (applicationId) => {
    try {
      await deleteApplication(applicationId);
      refresh();
    } catch (error) {
      // errors surfaced via hook
    }
  };

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
      minWidth: 800,
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
          <EditButton onClick={() => navigate(`/applications/${row._id}/edit`)} size={tableWidth < 500 ? "icon" : "xs"} />
          <DeleteButton onClick={() => handleDelete(row._id)} size={tableWidth < 500 ? "icon" : "xs"} />
        </div>
      ),
    },
  ];

  return (
    <>
    {/* // <PageContainer
    //   title="Applications"
    //   actions={
    //     <Link to="/applications/new" className="btn btn-lg btn-primary">
    //       Create
    //     </Link>
    //   }
    //   errors={errors}
    // > */}

      <ListSearch
        value={query}
        onChange={setQuery}
        placeholder="Search applications…"
        total={total}
      />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <DataTable
          columns={columns}
          data={data}
          sortField={sortField}
          sortDir={sortDir}
          onSort={toggleSort}
          emptyState={<p>No applications found.</p>}
        />
      )}
      
      <ListPagination page={page} totalPages={totalPages} onPageChange={setPage} />
    {/* // </PageContainer> */}
    </>
  );
};

export default ApplicationList;
