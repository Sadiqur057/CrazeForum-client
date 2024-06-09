import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import PropTypes from 'prop-types'
import LoadingSpinner from "@/components/spinner/LoadingSpinner";

const AdminRoutes = ({children}) => {
  const {user, loading, logOut} = useAuth()
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }
  
  if (user && isAdmin) {
    return children
  }
  logOut()
  .then()
  return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

AdminRoutes.propTypes ={
  children: PropTypes.node
}

export default AdminRoutes;