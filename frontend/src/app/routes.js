import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { APP_CONSTANTS } from "../constants";
import HomePage from "../pages/HomePage";
import CaptureImagePage from "../pages/CaptureImagePage";

const routes = [
  {
    path: APP_CONSTANTS.BASE_ROUTE_URLS.HOME,
    element: <HomePage />,
  },
  {
    path: APP_CONSTANTS.BASE_ROUTE_URLS.CAPTURE_IMAGE,
    element: <CaptureImagePage />,
  },
];

const BaseRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, i) => (
          <Route key={i} {...route} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default BaseRoutes;
