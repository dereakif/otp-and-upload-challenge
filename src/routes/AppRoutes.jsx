import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../layout";
import ErrorPage from "../pages/ErrorPage";

const OtpPage = lazy(() => import("../pages/OtpPage"));
const ImageUploadPage = lazy(() => import("../pages/ImageUploadPage"));

const routes = [
  {
    path: "/",
    name: "OTP",
    component: <OtpPage />,
  },
  {
    path: "/upload",
    name: "Upload",
    component: <ImageUploadPage />,
  },
];

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {routes.map((route) => (
            <Route
              key={route.name}
              path={route.path}
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  {route.component}
                </Suspense>
              }
            />
          ))}
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
