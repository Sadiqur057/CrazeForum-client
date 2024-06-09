import { useContext } from "react";
import { AuthContext } from "../proviers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

import PropTypes from 'prop-types';
import LoadingSpinner from "@/components/spinner/LoadingSpinner";


const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation()
  console.log(location)

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>
  }
  if (user) {
    return children
  }
  return <Navigate to='/login' state={{ from: location }} replace></Navigate>

};

PrivateRoutes.propTypes = {
  children: PropTypes.node  
};

export default PrivateRoutes;