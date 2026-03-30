import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext.jsx";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default PrivateRoute;
