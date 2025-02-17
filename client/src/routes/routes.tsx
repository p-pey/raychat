import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Client from "../pages/client/client";
import Agent from "../pages/webapp/webapp";
import ProtectedRoute from "./protectedRoute";
import { useEffect, useState } from "react";
import Subscribe from "../pages/client/utils/subscriber";
import AuthService, { user } from "../pages/client/services/auth.service";
import Login from "../pages/login/login";

export const AuthSubscriber = new Subscribe();
const Auth = new AuthService();

export default function AppRoutes() {
  const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(!!Auth.getUser());
  useEffect(()=> {
    AuthSubscriber.subscribe("login", (data) => {
      const user = data as user;
      Auth.setUser(user)
      setIsLoggedIn(!!data);
    
    })
  }, []);
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
