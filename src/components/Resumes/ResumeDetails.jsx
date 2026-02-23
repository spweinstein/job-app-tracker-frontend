import { useState, useEffect } from "react";
import { getResume, deleteResume } from "../../services/resumeService.js";
import { useParams, useNavigate, Link } from "react-router";
import { PageContainer } from "../shared/layout/index.js";
import "./Resume.css";
import { DeleteButton } from "../shared/ui/index.js";
import useErrors from "../../hooks/useErrors.js";
import DocumentLineagePanel from "../shared/views/DocumentLineagePanel/DocumentLineagePanel.jsx";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const ResumeDetails = () => {
  const {errors, addError, clearErrors} = useErrors();
  const [resume, setResume] = useState({ _id: null });
  const { resumeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await getResume(resumeId);
        setResume(res);
      } catch (e) {
        addError(e.message);
      }
    };
    fetchResume();
  }, [resumeId]);

  const handleDeleteClick = async () => {
    try {
      await deleteResume(resumeId);
      navigate("/resumes");
    } catch (e) {
      addError(e.message);
    }
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
          <DeleteButton onClick={handleDeleteClick} />
        </>
      }
      errors={errors}
    >
      <div className="resume-container">
        {/* Header */}
        <div className="resume-header">
          <h1 className="resume-name">{resume.name}</h1>
          <div className="resume-version" style={{float: "left", opacity: 0.7}}> v{resume.version || "0"}</div>
          {resume.link && (
            <div className="resume-link-header">
              <a href={resume.link} target="_blank" rel="noopener noreferrer">
                {resume.link}
              </a>
            </div>
          )}
        </div>

        {/* Summary */}
        {resume.summary && (
          <p className="resume-summary">{resume.summary}</p>
        )}

        {/* Experience */}
        {resume.experience?.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">Experience</h2>
            {resume.experience.map((exp, i) => (
              <div key={i} className="resume-item">
                <div className="resume-item-header">
                  <span className="resume-item-title">{exp.title}</span>
                  <span className="resume-item-date">
                    {formatDate(exp.startDate)}
                    {" – "}
                    {exp.endDate ? formatDate(exp.endDate) : "Present"}
                  </span>
                </div>
                {exp.company && (
                  <div className="resume-item-subtitle resume-item-company">
                    {exp.company.name ?? exp.company}
                  </div>
                )}
                {exp.description && (
                  <p className="resume-item-description">{exp.description}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {resume.education?.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">Education</h2>
            {resume.education.map((edu, i) => (
              <div key={i} className="education-item">
                <div className="education-header">
                  <div>
                    <div className="education-degree">{edu.degree}</div>
                    <div className="education-school">{edu.school}</div>
                  </div>
                  {edu.year && (
                    <span className="education-year">{edu.year}</span>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {resume.projects?.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">Projects</h2>
            {resume.projects.map((proj, i) => (
              <div key={i} className="resume-item">
                <div className="resume-item-header">
                  <span className="resume-item-title">
                    {proj.link ? (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-title-link"
                      >
                        {proj.title}
                        <span className="project-link-icon">↗</span>
                      </a>
                    ) : (
                      proj.title
                    )}
                  </span>
                  {proj.year && (
                    <span className="resume-item-date">{proj.year}</span>
                  )}
                </div>
                {proj.company && (
                  <div className="resume-item-subtitle resume-item-company">
                    {proj.company.name ?? proj.company}
                  </div>
                )}
                {proj.description && (
                  <p className="resume-item-description">{proj.description}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {resume.certifications?.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">Certifications</h2>
            {resume.certifications.map((cert, i) => (
              <div key={i} className="certification-item resume-item">
                <div className="resume-item-header">
                  <span className="resume-item-title">{cert.title}</span>
                  {cert.year && (
                    <span className="resume-item-date">{cert.year}</span>
                  )}
                </div>
                {cert.company && (
                  <div className="resume-item-subtitle resume-item-company">
                    {cert.company.name ?? cert.company}
                  </div>
                )}
                {cert.description && (
                  <p className="resume-item-description">{cert.description}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {resume.skills?.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">Skills</h2>
            <div className="skills-list">
              {resume.skills.map((skill, i) => (
                <span key={i} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Notes — outside the resume, for internal use only */}
      {resume.notes && (
        <div className="resume-notes">
          <strong>Notes: </strong>
          {resume.notes}
        </div>
      )}

      <DocumentLineagePanel document={resume} basePath="/resumes" />
    </PageContainer>
  );
};

export default ResumeDetails;