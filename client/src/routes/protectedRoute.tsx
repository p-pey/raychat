import { Outlet } from "react-router-dom";
import Login from "../pages/login/login";

export default function ProtectedRoute({ isLoggedIn }: { isLoggedIn: boolean }) {
  return isLoggedIn ? <Outlet /> : <Login />
};
