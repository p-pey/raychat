import { BrowserRouter, Route, Routes } from "react-router-dom";
import Client from "../pages/client/client";
import NotFound from "../pages/notfound";
import Agent from "../pages/webapp/webapp";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/client" element={<Client />} />
        <Route path="/webapp" element={<Agent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
