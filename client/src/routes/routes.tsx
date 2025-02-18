import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Client from "../pages/client/client";
import AuthService, { user } from "../pages/client/services/auth.service";
import Subscribe from "../pages/client/utils/subscriber";
import Login from "../pages/login/login";
import Agent from "../pages/webapp/webapp";
import ProtectedRoute from "./protectedRoute";

export const AuthSubscriber = new Subscribe();
const Auth = new AuthService();

export default function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!Auth.getUser());
  useEffect(() => {
    AuthSubscriber.subscribe("login", (data) => {
      console.log("Login ...");
      const user = data as user;
      Auth.setUser(user);
      setIsLoggedIn(!!data);
    });
  }, []);
  console.log("isLoggged: ", isLoggedIn);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/client" element={<Client />} />
          <Route path="/webapp" element={<Agent />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
