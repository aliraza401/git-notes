import React from "react";
import { LoginProps } from "./Login.interface";

import { paths } from "./../../constants/paths";
import styled from "styled-components";
import { Button } from "antd";
import { GithubFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { UserContextObject } from "../../context/UserContext";
import { StyledLogin } from "./Login.styled";
import { axiosQuery } from "../../utils/api";

export const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate();
  const { setuserFromToken } = React.useContext(UserContextObject);

  React.useEffect(() => {
    (async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const codeParam = urlParams.get("code");

      if (codeParam && localStorage.getItem("accessToken") === null) {
        const result = await axiosQuery({
          url: `/getToken?code=${codeParam}`,
          method: "GET",
        }).catch((err: string) => console.log({ err }));
        if (result.data.access_token.access_token) {
          localStorage.setItem("token", result.data.access_token.access_token);
          setuserFromToken();
          navigate(paths.URL_HOME);
        }
      }
    })();
  }, []);

  const loginWithGithub = () => {
    const githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    window.location.assign(
      paths.GITHUB_LOGIN_API + "?client_id=" + githubClientId + "&scope=gist"
    );
  };

  return (
    <StyledLogin>
      <Button onClick={loginWithGithub}>
        <GithubFilled /> Login With github
      </Button>
    </StyledLogin>
  );
};
