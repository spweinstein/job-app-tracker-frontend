import { useState, useEffect } from "react";
import {
  getCoverLetter,
  deleteCoverLetter,
} from "../../services/coverLetterService.js";
import { useParams, useNavigate, Link } from "react-router";
import { PageContainer } from "../shared/layout/index.js";
import "../shared/views/RecordDetails/RecordDetails.css";
import { DeleteButton } from "../shared/ui/index.js";
import useErrors from "../../hooks/useErrors.js";
import DocumentLineagePanel from "../shared/views/DocumentLineagePanel/DocumentLineagePanel.jsx";

const CoverLetterDetails = () => {
  const [coverLetter, setCoverLetter] = useState({ _id: null });
  const {errors, addError, clearErrors} = useErrors();
  const { coverLetterId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoverLetter = async () => {
      try {
        const res = await getCoverLetter(coverLetterId);
        setCoverLetter(res);
      } catch (e) {
        addError(e.message);
      }
    };
    fetchCoverLetter();
  }, [coverLetterId]);

  const handleDeleteClick = async () => {
    try {
      await deleteCoverLetter(coverLetterId);
      navigate("/cover-letters");
    } catch (e) {
      addError(e.message);
    }
  };

  if (coverLetter?._id === null) return <h3>Loading...</h3>;
  if (!coverLetter?._id) return <h3>Cover Letter Not Found</h3>;

  return (
    <PageContainer
      title="Cover Letter"
      actions={
        <>
          <Link
            to={`/cover-letters/${coverLetterId}/edit`}
            className="btn btn-primary btn-sm"
          >
            Edit
          </Link>
          <DeleteButton onClick={handleDeleteClick} />
        </>
      }
      errors={errors}
    >
      <div className="card">
        <div className="card-header">
          <h3>{coverLetter.name}          <span className="cover-letter-version" style={{float: "right", opacity: 0.7}}> v{coverLetter.version || "0"}</span>
          </h3>
        </div>
        
      </div>
      <DocumentLineagePanel document={coverLetter} basePath="/cover-letters" />
    </PageContainer>
  );
};

export default CoverLetterDetails;
