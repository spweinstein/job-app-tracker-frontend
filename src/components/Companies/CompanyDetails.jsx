import { useState, useEffect } from "react";
import { getCompany, deleteCompany } from "../../services/companyService.js";
import { deleteApplication } from "../../services/applicationService.js";
import { useParams, useNavigate, Link } from "react-router";
import { DataTable } from "../shared/views/index.js";
import { DeleteButton, EditButton, BackButton } from "../shared/ui/index.js";
import DetailsCard from "../shared/views/DetailsCard/DetailsCard.jsx";
import useErrors from "../../hooks/useErrors.js";
import { LoadingSpinner } from "../shared/ui/index.js";
import ApplicationList from "../Applications/ApplicationList.jsx";

const CompanyDetails = ({ setHeader = () => {} }) => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const {errors, addError, clearErrors} = useErrors();
  const [relatedApplications, setRelatedApplications] = useState([]);
  const { companyId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await getCompany(companyId);
        setCompany(res);
      } catch (e) {
        addError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [companyId]);

  const handleDeleteCompany = async () => {
    try {
      await deleteCompany(companyId);
      navigate("/companies");
    } catch (e) {
      addError(e.message);
    }
  };

  const handleDeleteApplication = async (applicationId) => {
    try {
      await deleteApplication(applicationId);
    } catch (e) {
      addError(e.message);
    }
  };

  useEffect(() => {
    setHeader({
      title: "Company Details",
      actions: (
        <>
          <BackButton onClick={() => navigate(-1)} />
          <EditButton onClick={() => navigate(`/companies/${companyId}/edit`)} />
          <DeleteButton onClick={handleDeleteCompany} />
        </>
      ),
    });
  }, [companyId]);

  if (loading) return <LoadingSpinner />;
  if (!company?._id) return <h3>Company Not Found</h3>;

  return (
    <>
      {errors.length > 0 && (
        <div id="error-message">{errors.map((e) => <p key={e}>{e}</p>)}</div>
      )}
      <DetailsCard
        title={{ label: "Company", value: company.name }}
        fields={[
          { label: "Website", value: company.url ? (
            <a href={company.url} target="_blank" rel="noopener noreferrer">
              {company.url}
            </a>
          ) : null },
          { label: "Description", value: company.description || null },
          { label: "Notes",       value: company.notes       || null },
        ]}
      />
      <h2>Job Applications</h2>
      <ApplicationList
        filterColumn="company"
        filterId={companyId}
      />
    </>
  );
};

export default CompanyDetails;
