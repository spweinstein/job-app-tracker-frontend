import { useState, useEffect } from "react";
import {
  getApplication,
  deleteApplication,
} from "../../services/applicationService.js";
import { useParams, useNavigate, Link } from "react-router";
import { PageContainer } from "../shared/layout/index.js";
import "../shared/views/RecordDetails/RecordDetails.css";

const ApplicationDetails = () => {
  const [application, setApplication] = useState({ _id: null });
  const { applicationId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await getApplication(applicationId);
        setApplication(res);
      } catch (e) {
        console.log(e);
      }
    };
    fetchApplication();
  }, [applicationId]);

  const handleDeleteClick = async () => {
    await deleteApplication(applicationId);
    navigate("/applications");
  };

  if (application?._id === null) return <h3>Loading...</h3>;
  if (!application?._id) return <h3>Application Not Found</h3>;

  return (
    <PageContainer
      title="Application"
      actions={
        <>
          <Link
            to={`/applications/${applicationId}/edit`}
            className="btn btn-primary btn-sm"
          >
            Edit
          </Link>
          <button onClick={handleDeleteClick} className="btn btn-danger btn-sm">
            Delete
          </button>
        </>
      }
    >
      <div className="card">
        <div className="card-header">
          <div className="card-field">
            <strong>Company:</strong>{" "}
            {application.company?._id ? (
              <Link to={`/companies/${application.company._id}`}>
                {application.company.name}
              </Link>
            ) : (
              application.company?.name || "N/A"
            )}
          </div>
          <div className="card-field">
            <strong>Job Title:</strong> {application.title || "Untitled"}
          </div>
        </div>
        <div className="card-field">
          <strong>Resume:</strong>{" "}
          {application.resume?._id ? (
            <Link to={`/resumes/${application.resume._id}`}>
              {application.resume.name || "Resume"}
            </Link>
          ) : (
            "N/A"
          )}
        </div>
        <div className="card-field">
          <strong>Status:</strong>{" "}
          <span className={`status status-${application.status.toLowerCase()}`}>
            {application.status}
          </span>
        </div>
        <div className="card-field">
          <strong>Priority:</strong>{" "}
          <span
            className={`priority priority-${application.priority.toLowerCase()}`}
          >
            {application.priority}
          </span>
        </div>
        <div className="card-field">
          <strong>Source:</strong> {application.source}
        </div>
        {application.appliedAt && (
          <div className="card-field">
            <strong>Applied At:</strong>{" "}
            {new Date(application.appliedAt).toLocaleDateString()}
          </div>
        )}
        {application.url && (
          <div className="card-field">
            <strong>Link:</strong>{" "}
            <a href={application.url} target="_blank" rel="noopener noreferrer">
              View Application
            </a>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default ApplicationDetails;
