import { useState, useEffect } from "react";
import {
  getApplication,
  deleteApplication,
} from "../../services/applicationService.js";
import { useParams, useNavigate, Link } from "react-router";
import DetailsCard from "../shared/views/DetailsCard/DetailsCard.jsx";
import { DeleteButton, EditButton, BackButton } from "../shared/ui/index.js";
import useErrors from "../../hooks/useErrors.js";

const ApplicationDetails = ({setHeader = () => {}}) => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const {errors, addError, clearErrors} = useErrors();
  const { applicationId } = useParams();

  const handleDeleteClick = async () => {
    try {
      await deleteApplication(applicationId);
      navigate("/applications");
    } catch (e) {
      addError(e.message);
    }
  };

  useEffect(() => {
    if (setHeader && typeof setHeader === "function") {
    setHeader({
      title: "Application Details",
      // Back, Edit, and Delete buttons
      actions: 
      <>
        <BackButton onClick={() => navigate(-1)} />
        <EditButton onClick={() => navigate(`/applications/${applicationId}/edit`)} />
        <DeleteButton onClick={handleDeleteClick} />
      </>
    });
    }
  }, []);
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

  if (loading) return <p>Loading…</p>;
  if (!application?._id) return <h3>Application Not Found</h3>;

  return (
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
  );
};

export default ApplicationDetails;
