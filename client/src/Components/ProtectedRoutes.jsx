import { Navigate, Outlet } from "react-router-dom";
import { useMyFunctions } from "./AuthContext";

const ProtectedRoutes = () => {
  const { isAuth } = useMyFunctions();
  console.log("main route", isAuth);
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};
export default ProtectedRoutes;
