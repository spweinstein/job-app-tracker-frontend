import { useState, useEffect } from "react";
import {
  getCoverLetter,
  deleteCoverLetter,
} from "../../services/coverLetterService.js";
import { useParams, useNavigate, Link } from "react-router";
import { PageContainer } from "../shared/layout/index.js";
import "../shared/views/RecordDetails/RecordDetails.css";
const CoverLetterDetails = () => {
  const [coverLetter, setCoverLetter] = useState({ _id: null });
  const { coverLetterId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoverLetter = async () => {
      try {
        const res = await getCoverLetter(coverLetterId);
        setCoverLetter(res);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCoverLetter();
  }, [coverLetterId]);

  const handleDeleteClick = async () => {
    await deleteCoverLetter(coverLetterId);
    navigate("/cover-letters");
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
          <button onClick={handleDeleteClick} className="btn btn-danger btn-sm">
            Delete
          </button>
        </>
      }
    >
      <div>
        <h3>{coverLetter.name}</h3>
        {coverLetter.body && <p>{coverLetter.body}</p>}
        {coverLetter.notes && <p>Notes: {coverLetter.notes}</p>}
      </div>
    </PageContainer>
  );
};

export default CoverLetterDetails;
