import { RouteObject } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Detail } from "../pages/Detail/Detail";
import { Login } from "../pages/Login/Login";
import { NotFound } from "../pages/NotFound/NotFound";
import { paths } from "./../constants/paths";
import { UserProfile } from "../pages/UserProfile/UserProfile";
import { GistEditor } from "../pages/GistEditor/GistEditor";

export interface RoutePram extends Record<string, string | undefined> {}

export interface PathRoute extends Omit<RouteObject, "children" | "element"> {
  element?: JSX.Element
  children?: PathRoute[]
  render?: boolean
}

export const OPEN_ROUTES: PathRoute[] = [
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

export const AUTHENTICATED_ROUTES: PathRoute[] = [
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

export const UNAUTHENTICATED_ROUTES: PathRoute[] = [
  {
    path: paths.URL_LOGIN,
    element: <Login />,
  },
];
