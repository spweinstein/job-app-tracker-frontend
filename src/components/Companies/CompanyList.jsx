import { useState, useEffect } from "react";
import { getCompanies, deleteCompany } from "../../services/companyService.js";
import { Link, useNavigate } from "react-router";
import { DataTable } from "../shared/views/index.js";
import { DeleteButton, EditButton, LoadingSpinner } from "../shared/ui/index.js";
import useErrors from "../../hooks/useErrors.js";
import usePaginatedQuery from "../../hooks/usePaginatedQuery.js";
import { ListSearch } from "../shared/list/ListSearch.jsx";
import { ListPagination } from "../shared/list/ListPagination.jsx";

const CompanyList = ({ setHeader = () => {} }) => {
  const navigate = useNavigate();

  const {errors, addError, clearErrors} = useErrors();
  const {data, total, totalPages, loading, query, setQuery, sortField, sortDir, toggleSort, page, setPage, refresh} = usePaginatedQuery(getCompanies);

  useEffect(() => {
    setHeader({
      title: "Companies",
      actions: (
        <Link to="/companies/new" className="btn btn-lg btn-primary">
          Create
        </Link>
      ),
    });
  }, []);

  const handleEdit = (companyId) => {
    navigate(`/companies/${companyId}/edit`);
  };

  const handleDelete = async (companyId) => {
    try {
      await deleteCompany(companyId);
      refresh();
    } catch (error) {
      addError(error.message);
    }
  };

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
      render: (row, {tableWidth}) => (
        <div className="actions">
          <EditButton onClick={() => navigate(`/companies/${row._id}/edit`)} size={tableWidth < 500 ? "icon" : "xs"} />
          <DeleteButton onClick={() => handleDelete(row._id)} size={tableWidth < 500 ? "icon" : "xs"} />
        </div>
      ),
    },
  ];

  return (
    <>
      {errors.length > 0 && (
        <div id="error-message">{errors.map((e) => <p key={e}>{e}</p>)}</div>
      )}
      <ListSearch
        value={query}
        onChange={setQuery}
        placeholder="Search companies…"
        total={total}
      />
      <ListPagination page={page} totalPages={totalPages} onPageChange={setPage} />
      {loading ? (
        <LoadingSpinner />
        ) : (
        <DataTable
          columns={columns}
          data={data}
          sortField={sortField}
          sortDir={sortDir}
          onSort={toggleSort}
          emptyState={<p>No companies found.</p>}
        />
      )}
    </>
  );
};

export default CompanyList;
