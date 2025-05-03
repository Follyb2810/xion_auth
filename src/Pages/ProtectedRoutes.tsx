
import { useAuth } from "@/context/useAuth";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {

  const {isAuthenticated,user} = useAuth()

  if (!isAuthenticated || !user?.walletAddress) {
    return <Navigate to="/" />;
  }
  
  return <Outlet/>
}
export default ProtectedRoutes
