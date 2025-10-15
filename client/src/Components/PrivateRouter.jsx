import { Navigate, Outlet } from "react-router-dom";
import { useAdminFunctions } from "../provider/AdminProvider";

const PrivateRouter = () => {
  const { role } = useAdminFunctions();


  if (role === null) return <p>Loading...</p>;

  return role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRouter;
