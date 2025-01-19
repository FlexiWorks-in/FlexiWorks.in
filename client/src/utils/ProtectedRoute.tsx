import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RootState } from "../app/store";

const ProtectedRoute: React.FC = () => {
  const location = useLocation();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  console.log("ProtectedRoute :: isAuthenticated: ", isAuthenticated);
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/landing-page" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
