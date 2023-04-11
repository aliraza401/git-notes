import React from "react";
import useUser from "../hooks/useUser/useUser";
import { User } from "./../hooks/useUser/useUser.interface";

export const UserContextObject = React.createContext({
  user: null as User | null,
  token: null as string | null,
  logOut: () => {},
  loginWithGithub: (githubClientId: string) => {},
  valiadteLogin: (codeParam: string): any => {},
  setuserFromToken: () => {},
});

interface UserContextProps {
  children: React.ReactNode;
}

export const UserContext = ({ children }: UserContextProps) => {
  const {
    user,
    token,
    logOut,
    setuserFromToken,
    valiadteLogin,
    loginWithGithub,
  } = useUser();

  return (
    <UserContextObject.Provider
      value={{
        user,
        token,
        logOut,
        valiadteLogin,
        loginWithGithub,
        setuserFromToken,
      }}
    >
      {children}
    </UserContextObject.Provider>
  );
};
