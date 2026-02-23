import { useState, useEffect } from "react";
import {
  getCoverLetter,
  deleteCoverLetter,
} from "../../services/coverLetterService.js";
import { useParams, useNavigate, Link } from "react-router";
import { PageContainer } from "../shared/layout/index.js";
import DetailsCard from "../shared/views/DetailsCard/DetailsCard.jsx";
import { DeleteButton } from "../shared/ui/index.js";
import useErrors from "../../hooks/useErrors.js";
import DocumentLineagePanel from "../shared/views/DocumentLineagePanel/DocumentLineagePanel.jsx";

const CoverLetterDetails = () => {
  const [coverLetter, setCoverLetter] = useState(null);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
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

  if (loading) return <p>Loading…</p>;
  if (!coverLetter?._id) return <h3>Cover Letter Not Found</h3>;

  return (
    <PageContainer
      title={coverLetter.name}
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
      <DetailsCard
        title={{ label: "Name",    value: coverLetter.name }}
        subtitle={{ label: "Version", value: `v${coverLetter.version || "0"}` }}
        fields={[
          { label: "Body",  value: coverLetter.body  || null },
          { label: "Notes", value: coverLetter.notes || null },
        ]}
      />
      <DocumentLineagePanel document={coverLetter} basePath="/cover-letters" />
    </PageContainer>
  );
};

export default CoverLetterDetails;
