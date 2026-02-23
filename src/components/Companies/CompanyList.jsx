import { useState, useEffect } from "react";
import { getCompanies, deleteCompany } from "../../services/companyService.js";
import { Link, useNavigate } from "react-router";
import { PageContainer } from "../shared/layout/index.js";
import { DataTable } from "../shared/views/index.js";
import { DeleteButton, EditButton } from "../shared/ui/index.js";
import useErrors from "../../hooks/useErrors.js";
import usePaginatedQuery from "../../hooks/usePaginatedQuery.js";
import { TextInput } from "../shared/forms/index.js";
import { ListSearch } from "../shared/list/ListSearch.jsx";
import { ListPagination } from "../shared/list/ListPagination.jsx";

const CompanyList = () => {
  const navigate = useNavigate();

  // Pagination logic (will become usePaginatedQuery hook)
  const {errors, addError, clearErrors} = useErrors();
  const {data, total, totalPages, loading, query, setQuery, sortField, sortDir, toggleSort, page, setPage, refresh} = usePaginatedQuery(getCompanies);
  
  const handleEdit = (companyId) => {
    navigate(`/companies/${companyId}/edit`);
  };

  const handleDelete = async (companyId) => {
    try {
      const deletedCompany = await deleteCompany(companyId);
      refresh();
    } catch (error) {
      addError(error.message);
    }
  };

  if (!data)
    return (
      <>
        <h2>Companies</h2>
        <p>No companies found</p>
      </>
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
      render: (row, {tableWidth}) => (
        <div className="actions">
          <EditButton onClick={() => navigate(`/companies/${row._id}/edit`)} size={tableWidth < 500 ? "icon" : "xs"} />
          <DeleteButton onClick={() => handleDelete(row._id)} size={tableWidth < 500 ? "icon" : "xs"} />
        </div>
      ),
    },
  ];

  return (
      <PageContainer
        title="Companies"
        actions={
          <Link to="/companies/new" className="btn btn-lg btn-primary">
            Create
          </Link>
        }
        errors={errors}
      >
        <ListSearch
          value={query}
          onChange={setQuery}
          placeholder="Search companies…"
          total={total}
        />
        <ListPagination page={page} totalPages={totalPages} onPageChange={setPage} />

        <DataTable
          columns={columns}
          data={data}
          sortField={sortField}
          sortDir={sortDir}
          onSort={toggleSort}
          emptyState={loading ? <p>Loading…</p> : <p>No companies found.</p>}
        />
      </PageContainer>
  );
};

export default CompanyList;
