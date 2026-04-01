import { useState, useCallback } from "react";
import { Outlet } from "react-router";
import { PageContainer } from "../shared/layout/index.js";

const CoverLetterPage = () => {
  const [title, setTitle] = useState("");
  const [actions, setActions] = useState(null);
  const [errors, setErrors] = useState([]);

  const setHeader = useCallback(
    ({ title, actions = null, errors = [] }) => {
      setTitle(title);
      setActions(actions);
      setErrors(errors);
    },
    [setTitle, setActions, setErrors],
  );

  return (
    <PageContainer title={title} actions={actions} errors={errors}>
      <Outlet context={{ setHeader }} />
    </PageContainer>
  );
};

export default CoverLetterPage;
