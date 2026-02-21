import { useState, useEffect } from "react";
import { getCompanies, deleteCompany } from "../../services/companyService.js";
import { Link, useNavigate } from "react-router";
import { PageContainer } from "../shared/layout/index.js";
import { DataTable } from "../shared/views/index.js";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  const fetchCompanies = async () => {
    const companies = await getCompanies();
    setCompanies(companies);
  };
  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleEdit = (companyId) => {
    navigate(`/companies/${companyId}/edit`);
  };

  const handleDelete = async (companyId) => {
    try {
      const deletedCompany = await deleteCompany(companyId);
      fetchCompanies();
    } catch (error) {
      console.error(`[handleDelete error]: ${error.message}`);
    }
  };

  if (!companies)
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
            onClick={() => navigate(`/companies/${row._id}/edit`)}
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
      title="Companies"
      actions={
        <Link to="/companies/new" className="btn btn-lg btn-primary">
          Create
        </Link>
      }
    >
      <DataTable
        columns={columns}
        data={companies}
        emptyState={<p>No companies found</p>}
      />
    </PageContainer>
  );
};

export default CompanyList;
