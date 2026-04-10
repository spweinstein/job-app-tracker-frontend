import { useEffect, useCallback } from "react";
import { getCompanies, deleteCompany } from "../../services/companyService.js";
import { Link, useNavigate } from "react-router";
import { DataTable } from "../shared/views/index.js";
import {
  DeleteButton,
  EditButton,
  LoadingSpinner,
} from "../shared/ui/index.js";
import useErrors from "../../hooks/useErrors.js";
import usePaginatedQuery from "../../hooks/usePaginatedQuery.js";
import { ListSearch } from "../shared/list/ListSearch.jsx";
import { ListPagination } from "../shared/list/ListPagination.jsx";
import { useOutletContext } from "react-router";

const CompanyList = () => {
  const navigate = useNavigate();
  const { setHeader } = useOutletContext();

  const { errors, addError, clearErrors } = useErrors();
  const { params, setParams, response, setFilter, toggleSort, refresh } =
    usePaginatedQuery(getCompanies, {
      page: 1,
      limit: 10,
      sort: "updatedAt",
      sortDir: "desc",
    });

  useEffect(() => {
    setHeader({
      title: "Companies",
      actions: (
        <Link to="/companies/new" className="btn btn-lg btn-primary">
          Create
        </Link>
      ),
    });
  }, [setHeader]);

  const handleDelete = useCallback(
    async (companyId) => {
      try {
        await deleteCompany(companyId);
        refresh();
        clearErrors();
      } catch (error) {
        addError(error.message);
      }
    },
    [refresh, addError, clearErrors],
  );

  const columns = [
    {
      key: "name",
      label: "Company Name",
      render: (row) => (
        <Link to={`/companies/${row._id}`}>{row.name || "Untitled"}</Link>
      ),
      sortable: true,
    },
    {
      key: "updatedAt",
      label: "Last Updated",
      render: (row) =>
        row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : "-",
      sortable: true,
    },
    {
      key: "actions",
      label: "Actions",
      isActions: true,
      render: (row, { tableWidth }) => (
        <div className="actions">
          <EditButton
            onClick={() => navigate(`/companies/${row._id}/edit`)}
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

  if (response.loading) return <LoadingSpinner />;

  return (
    <>
      {errors.length > 0 && (
        <div id="error-message">
          {errors.map((e) => (
            <p key={e}>{e}</p>
          ))}
        </div>
      )}
      <ListSearch
        value={params.q}
        onChange={setFilter}
        placeholder="Search companies…"
        total={response.total}
      />
      <ListPagination
        page={params.page}
        totalPages={response.totalPages}
        onPageChange={(page) => setParams({ ...params, page })}
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
          emptyState={<p>No companies found.</p>}
        />
      )}
    </>
  );
};

export default CompanyList;
