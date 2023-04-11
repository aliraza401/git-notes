import React from "react";
import { User } from "./useUser.interface";
import { axiosQuery } from "./../../utils/api";
import { paths } from "../../constants/paths";
import { getToken, getUser } from "../../services/userService";

export default function useGists() {
  const [user, setUser] = React.useState<User | null>(null);
  const [token, setToken] = React.useState<string | null>(null);

  const setuserFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setToken(token);
    const fetchUser = async () => {
      try {
        const response = await getUser();
        setUser(response);
      } catch (err) {
        logOut();
      }
    };

    fetchUser();
  };

  React.useEffect(() => setuserFromToken(), []);

  const valiadteLogin = async (codeParam: string): Promise<boolean> => {
    try {
      if (codeParam && localStorage.getItem("accessToken") === null) {
        const result = await getToken(codeParam);

        if (result.access_token.access_token) {
          localStorage.setItem("token", result.access_token.access_token);
          setuserFromToken();
          return true;
        }
      }
      return false;
    } catch (err) {
      console.log({ err });
      return false;
    }
  };

  const loginWithGithub = (githubClientId: string) => {
    window.location.assign(
      `${paths.GITHUB_LOGIN_API}?client_id=${githubClientId}&scope=gist`
    );
  };

  const logOut = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return {
    user,
    token,
    logOut,
    setuserFromToken,
    valiadteLogin,
    loginWithGithub,
  };
}
