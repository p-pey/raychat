import { BrowserRouter, Route, Routes } from "react-router-dom";
import Agent from "../pages/agent/agent";
import NotFound from "../pages/notfound";
import Webapp from "../pages/webapp/webapp";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/webapp" element={<Webapp />} />
        <Route path="/agent" element={<Agent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
