import { useState, useEffect } from "react";
import { getResume, deleteResume } from "../../services/resumeService.js";
import { useParams, useNavigate, Link } from "react-router";
import { PageContainer } from "../shared/layout/index.js";
import "../shared/views/RecordDetails/RecordDetails.css";
import "./Resume.css";

const ResumeDetails = () => {
  const [resume, setResume] = useState({ _id: null });
  const { resumeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await getResume(resumeId);
        setResume(res);
      } catch (e) {
        console.log(e);
      }
    };
    fetchResume();
  }, [resumeId]);

  const handleDeleteClick = async () => {
    await deleteResume(resumeId);
    navigate("/resumes");
  };

  if (resume?._id === null) return <h3>Loading...</h3>;
  if (!resume?._id) return <h3>Resume Not Found</h3>;

  return (
    <PageContainer
      title="Resume"
      actions={
        <>
          <Link
            to={`/resumes/${resumeId}/edit`}
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
            <strong>Name:</strong> {resume.name}
          </div>
        </div>
        {resume.summary && (
          <div className="card-field">
            <strong>Summary:</strong> <p>{resume.summary}</p>
          </div>
        )}
        {resume.notes && (
          <div className="card-field">
            <strong>Notes:</strong> <p>{resume.notes}</p>
          </div>
        )}
        {resume.link && (
          <div className="card-field">
            <strong>Link:</strong>{" "}
            <a href={resume.link} target="_blank" rel="noopener noreferrer">
              View Resume
            </a>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default ResumeDetails;
