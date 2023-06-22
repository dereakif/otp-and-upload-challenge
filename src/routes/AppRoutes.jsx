import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../layout";
import ErrorPage from "../pages/ErrorPage";

const OtpPage = lazy(() => import("../pages/OtpPage"));
const ImageUploadPage = lazy(() => import("../pages/ImageUploadPage"));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<OtpPage />} />
          <Route path="/upload" element={<ImageUploadPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
