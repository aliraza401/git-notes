import React from "react";
import { LoginProps } from "./Login.interface";

import { paths } from "./../../constants/paths";
import { Button } from "antd";
import { GithubFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { UserContextObject } from "../../context/UserContext";
import { StyledLogin } from "./Login.styled";

export const Login: React.FC<LoginProps> = () => {
  const { valiadteLogin, loginWithGithub } =
    React.useContext(UserContextObject);
  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const codeParam = urlParams.get("code");

      if (codeParam) {
        const result = await valiadteLogin(codeParam);
        if (result) navigate(paths.URL_HOME);
      }
    })();
  }, []);

  const handleLogin = () => {
    const githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    if (githubClientId) loginWithGithub(githubClientId);
  };

  return (
    <StyledLogin>
      <Button onClick={handleLogin}>
        <GithubFilled /> Login With github
      </Button>
    </StyledLogin>
  );
};
