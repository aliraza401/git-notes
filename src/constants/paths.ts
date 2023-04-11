export enum paths {
  // Internal routing
  URL_HOME = "/",
  URL_DETAIL = "/gist-detail/:id",
  URL_LOGIN = "/login",
  URL_USER_PROFILE = "/user-profile",
  URL_EDITOR = "/gist-editor/:id",
  URL_CREATE = "/gist-editor",

  // Data fetching
  GIHUB_API = "https://api.github.com",
  GITHUB_LOGIN_API = "https://github.com/login/oauth/authorize",
}
