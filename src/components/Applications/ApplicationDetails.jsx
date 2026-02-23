import { useState, useEffect } from "react";
import {
  getApplication,
  deleteApplication,
} from "../../services/applicationService.js";
import { useParams, useNavigate, Link } from "react-router";
import { PageContainer } from "../shared/layout/index.js";
import DetailsCard from "../shared/views/DetailsCard/DetailsCard.jsx";
import { DeleteButton } from "../shared/ui/index.js";
import useErrors from "../../hooks/useErrors.js";

const ApplicationDetails = () => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const {errors, addError, clearErrors} = useErrors();
  const { applicationId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await getApplication(applicationId);
        setApplication(res);
      } catch (e) {
        addError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchApplication();
  }, [applicationId]);

  const handleDeleteClick = async () => {
    try {
      await deleteApplication(applicationId);
      navigate("/applications");
    } catch (e) {
      addError(e.message);
    }
  };

  if (loading) return <p>Loading…</p>;
  if (!application?._id) return <h3>Application Not Found</h3>;

  return (
    <PageContainer
      title={"Application Details"}
      actions={
        <>
          <Link
            to={`/applications/${applicationId}/edit`}
            className="btn btn-primary btn-sm"
          >
            Edit
          </Link>
          <DeleteButton onClick={handleDeleteClick} />
        </>
      }
      errors={errors}
    >
      <DetailsCard
        title={{
          label: "Company",
          value: application.company?._id ? (
            <Link to={`/companies/${application.company._id}`}>
              {application.company.name}
            </Link>
          ) : (application.company?.name || "Unknown"),
        }}
        subtitle={{ label: "Job Title", value: application.title || "Untitled" }}
        fields={[
          {
            label: "Status",
            value: (
              <span className={`status status-${application.status?.toLowerCase()}`}>
                {application.status}
              </span>
            ),
          },
          {
            label: "Priority",
            value: (
              <span className={`priority priority-${application.priority?.toLowerCase()}`}>
                {application.priority}
              </span>
            ),
          },
          { label: "Source", value: application.source || null },
          {
            label: "Applied",
            value: application.appliedAt
              ? new Date(application.appliedAt).toLocaleDateString()
              : null,
          },
          {
            label: "Resume",
            value: application.resume?._id ? (
              <Link to={`/resumes/${application.resume._id}`}>
                {application.resume.name || "Resume"}
              </Link>
            ) : null,
          },
          {
            label: "Link",
            value: application.url ? (
              <a href={application.url} target="_blank" rel="noopener noreferrer">
                View Posting ↗
              </a>
            ) : null,
          },
        ]}
      />
    </PageContainer>
  );
};

export default ApplicationDetails;
