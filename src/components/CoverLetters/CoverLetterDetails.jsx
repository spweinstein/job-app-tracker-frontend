import { useState, useEffect } from "react";
import {
  getCoverLetter,
  deleteCoverLetter,
} from "../../services/coverLetterService.js";
import { useParams, useNavigate } from "react-router";
import DetailsCard from "../shared/views/DetailsCard/DetailsCard.jsx";
import { BackButton, EditButton, DeleteButton, LoadingSpinner } from "../shared/ui/index.js";
import useErrors from "../../hooks/useErrors.js";
import DocumentLineagePanel from "../shared/views/DocumentLineagePanel/DocumentLineagePanel.jsx";
import ApplicationList from "../Applications/ApplicationList.jsx";

const CoverLetterDetails = ({ setHeader = () => {} }) => {
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

  useEffect(() => {
    setHeader({
      title: "Cover Letter Details",
      actions: (
        <>
          <BackButton onClick={() => navigate(-1)} />
          <EditButton onClick={() => navigate(`/cover-letters/${coverLetterId}/edit`)} />
          <DeleteButton onClick={handleDeleteClick} />
        </>
      ),
    });
  }, [coverLetterId]);

    if (loading) return <LoadingSpinner />;
  if (!coverLetter?._id) return <h3>Cover Letter Not Found</h3>;

  return (
    <>
      {errors.length > 0 && (
        <div id="error-message">{errors.map((e) => <p key={e}>{e}</p>)}</div>
      )}
      <DetailsCard
        title={{ label: "Name",    value: coverLetter.name }}
        subtitle={{ label: "Version", value: `v${coverLetter.version || "0"}` }}
        fields={[
          { label: "Body",  value: coverLetter.body  || null },
          { label: "Notes", value: coverLetter.notes || null },
        ]}
      />
      <ApplicationList
        filterColumn="coverLetter"
        filterId={coverLetterId}
      />
      <DocumentLineagePanel document={coverLetter} basePath="/cover-letters" />
    </>
  );
};

export default CoverLetterDetails;
