import { RouteObject } from "react-router-dom";
import { Home } from "../pages/Home";
import { Detail } from "../pages/Detail";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { paths } from "./../constants/paths";
import { UserProfile } from "../pages/UserProfile";
import { GistEditor } from "../pages/GistEditor";

export interface Route extends RouteObject {
  name?: string;
  children?: Route[];
}

export const OPEN_ROUTES: Route[] = [
  {
    path: paths.URL_HOME,
    element: <Home />,
  },
  {
    path: paths.URL_DETAIL,
    element: <Detail />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export const AUTHENTICATED_ROUTES: Route[] = [
  {
    path: paths.URL_USER_PROFILE,
    element: <UserProfile />,
  },
  {
    path: paths.URL_EDITOR,
    element: <GistEditor />,
  },
  {
    path: paths.URL_CREATE,
    element: <GistEditor />,
  },
];

export const UNAUTHENTICATED_ROUTES: Route[] = [
  {
    path: paths.URL_LOGIN,
    element: <Login />,
  },
];
