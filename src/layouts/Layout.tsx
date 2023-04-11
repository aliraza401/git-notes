import React from "react";
import {
  matchRoutes,
  Navigate,
  RouteObject,
  useLocation,
} from "react-router-dom";

import { paths } from "./../constants/paths";
import { AUTHENTICATED_ROUTES, UNAUTHENTICATED_ROUTES } from "../router/routes";
import { Header } from "../components/Header/Header";
import { UserContextObject } from "../context/UserContext";
import { LayoutProps } from "./Layout.interface";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  const { token } = React.useContext(UserContextObject);
  const isAuthenticated = Boolean(token);

  const authenticated_route = Boolean(
    matchRoutes(AUTHENTICATED_ROUTES as RouteObject[], pathname)?.length
  );
  const unauthenticated_route = Boolean(
    matchRoutes(UNAUTHENTICATED_ROUTES as RouteObject[], pathname)?.length
  );

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
