import React from "react";
import useGists from "../hooks/useGists/useGists";
import {
  GistLayout,
  Gist,
  FetchGistTypes,
} from "./../hooks/useGists/useGists.interface";

export const GistContextObject = React.createContext({
  gists: [] as Gist[],
  gist: null as Gist | null,
  loading: false,
  error: "",
  layoutType: GistLayout.list,
  setLayoutType: (type: GistLayout) => {},
  fetchUserGists: ({ per_page, page, username }: FetchGistTypes) => {},
  setPaginationState: ({ per_page, page }: FetchGistTypes) => {},
  paginationState: {
    per_page: 9,
    page: 1,
  } as FetchGistTypes,
  userGists: [] as Gist[],
  setSelectedGist: (id: string | null) => {},
});

interface GistContextProps {
  children: React.ReactNode;
}

export const GistContext = ({ children }: GistContextProps) => {
  const {
    gists,
    loading,
    error,
    layoutType,
    setLayoutType,
    gist,
    setSelectedGist,
    fetchUserGists,
    userGists,
    paginationState,
    setPaginationState,
  } = useGists();

  return (
    <GistContextObject.Provider
      value={{
        gists,
        loading,
        error,
        layoutType,
        setLayoutType,
        gist,
        setSelectedGist,
        fetchUserGists,
        userGists,
        paginationState,
        setPaginationState,
      }}
    >
      {children}
    </GistContextObject.Provider>
  );
};
