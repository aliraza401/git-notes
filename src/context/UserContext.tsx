import React from "react";
import useUser from "../hooks/useUser/useUser";
import { User } from "./../hooks/useUser/useUser.interface";

export const UserContextObject = React.createContext({
  user: null as User | null,
  token: null as string | null,
  logOut: () => {},
  setuserFromToken: () => {},
});

interface UserContextProps {
  children: React.ReactNode;
}

export const UserContext = ({ children }: UserContextProps) => {
  const { user, token, logOut, setuserFromToken } = useUser();

  return (
    <UserContextObject.Provider
      value={{
        user,
        token,
        logOut,
        setuserFromToken,
      }}
    >
      {children}
    </UserContextObject.Provider>
  );
};
