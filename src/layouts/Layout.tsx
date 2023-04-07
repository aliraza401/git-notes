import React from "react";
import { matchRoutes, Navigate, useLocation } from "react-router-dom";

import { paths } from "./../constants/paths";
import { AUTHENTICATED_ROUTES, UNAUTHENTICATED_ROUTES } from "../router/routes";
import { Header } from "../components/Header";
import { UserContextObject } from "../context/UserContext";
import { LayoutProps } from "./Layout.interface";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  const { token } = React.useContext(UserContextObject);
  const isAuthenticated = !!token;

  const authenticated_route = !!matchRoutes(AUTHENTICATED_ROUTES, pathname)
    ?.length;
  const unauthenticated_route = !!matchRoutes(UNAUTHENTICATED_ROUTES, pathname)
    ?.length;

  if (!isAuthenticated && authenticated_route)
    return <Navigate to={paths.URL_LOGIN} />;

  if (isAuthenticated && unauthenticated_route)
    return <Navigate to={paths.URL_HOME} replace />;

  return (
    <div>
      <Header />
      {children(isAuthenticated)}
    </div>
  );
};
