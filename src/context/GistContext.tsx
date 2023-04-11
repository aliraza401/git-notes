import React from "react";
import useGists from "../hooks/useGists/useGists";
import {
  GistLayout,
  Gist,
  FetchGistTypes,
  GistForm,
} from "./../hooks/useGists/useGists.interface";

export const GistContextObject = React.createContext({
  gists: [] as Gist[],
  gist: null as Gist | null,
  loading: false,
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
  createGist: (inputObj: GistForm) => {},
  updateGist: (inputObj: GistForm) => {},
  onStarGist: (id: string) => {},
  onDeleteGist: (id: string) => {},
  onForkGist: (id: string) => {},
  onUnStarGist: (id: string) => {},
});

interface GistContextProps {
  children: React.ReactNode;
}

export const GistContext = ({ children }: GistContextProps) => {
  const {
    gists,
    loading,
    layoutType,
    setLayoutType,
    gist,
    setSelectedGist,
    fetchUserGists,
    userGists,
    paginationState,
    setPaginationState,
    createGist,
    updateGist,
    onStarGist,
    onDeleteGist,
    onForkGist,
    onUnStarGist,
  } = useGists();

  return (
    <GistContextObject.Provider
      value={{
        gists,
        loading,
        layoutType,
        setLayoutType,
        gist,
        setSelectedGist,
        fetchUserGists,
        userGists,
        paginationState,
        setPaginationState,
        createGist,
        updateGist,
        onStarGist,
        onDeleteGist,
        onForkGist,
        onUnStarGist,
      }}
    >
      {children}
    </GistContextObject.Provider>
  );
};
