// custom hook to manage form errors
import { useState } from "react";

/*
Usage:
const {errors, addError, clearErrors} = useErrors();
addError("Error message");
clearErrors();

return (
  <PageContainer errors={errors}>
    <h1>Page Title</h1>
    <p>Page Content</p>
  </PageContainer>
)

*/

const useErrors = () => {
  const [errors, setErrors] = useState([]);

  const addError = (message) => {
    // Ensure we can handle multiple errors
    setErrors((prevErrors) => ([...prevErrors, message]));
  };

  const clearErrors = () => {
    setErrors([]);
  };

  return {errors, addError, clearErrors};
};

export default useErrors;