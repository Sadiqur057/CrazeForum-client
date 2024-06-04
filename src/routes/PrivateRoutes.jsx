import { useContext } from "react";
import { AuthContext } from "../proviers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation()
  console.log(location)

  if (loading) {
    return <p className="h-screen flex justify-center items-center ">Loading...</p>
  }
  if (user) {
    return children
  }
  return <Navigate to='/login' state={{ from: location }} replace></Navigate>

};

export default PrivateRoutes;