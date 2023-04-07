import React from "react";
import { User } from "./useUser.interface";
import { axiosQuery } from "./../../utils/api";

export default function useGists() {
  const [user, setUser] = React.useState<User | null>(null);
  const [token, setToken] = React.useState<string | null>(null);

  const setuserFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setToken(token);
    const fetchUser = async () => {
      const response = await axiosQuery({
        url: `/user`,
        method: "GET",
      }).catch((error: string) => {
        setToken(null);
        return;
      });
      setUser(response.data);
    };

    fetchUser();
  };

  React.useEffect(() => {
    setuserFromToken();
  }, []);

  const logOut = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return { user, token, logOut, setuserFromToken };
}
