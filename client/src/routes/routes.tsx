import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Client from "../pages/client/client";
import AuthService, { user } from "../services/auth.service";
import Subscribe from "../utils/subscriber";
import Login from "../pages/login/login";
import Agent from "../pages/webapp/webapp";
import ProtectedRoute from "./protectedRoute";

export const AuthSubscriber = new Subscribe();
const Auth = new AuthService();

export default function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!Auth.getUser());
  const navigate = useNavigate();
  useEffect(() => {
    AuthSubscriber.subscribe("login", (data) => {
      const user = data as user;
      console.log(user);
      Auth.setUser(user);
      setIsLoggedIn(!!data);
      navigate(user.role === "agent" ? "/webapp" : "/client")
    });
  }, []);
  return (

      <Routes>
        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/client" element={<Client />} />
          <Route path="/webapp" element={<Agent />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
   
  );
}
