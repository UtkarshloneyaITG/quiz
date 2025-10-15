import { Navigate, Outlet } from "react-router-dom";
import { useMyFunctions } from "../provider/MyAuthProvider";


const ProtectedRoutes = () => {
  const { isAuth } = useMyFunctions();

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};
export default ProtectedRoutes;
