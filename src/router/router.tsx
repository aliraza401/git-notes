import { BrowserRouter, Routes } from "react-router-dom";

import { Layout } from "./../layouts/Layout";
import { RecursiveRouteMapper } from "./RecursiveRouteMapper";
import {
  AUTHENTICATED_ROUTES,
  OPEN_ROUTES,
  UNAUTHENTICATED_ROUTES,
} from "./routes";

export const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        {(isAuthenticated: boolean) => (
          <Routes>
            {RecursiveRouteMapper(
              isAuthenticated ? AUTHENTICATED_ROUTES : UNAUTHENTICATED_ROUTES
            )}
            {RecursiveRouteMapper(OPEN_ROUTES)}
          </Routes>
        )}
      </Layout>
    </BrowserRouter>
  );
};
