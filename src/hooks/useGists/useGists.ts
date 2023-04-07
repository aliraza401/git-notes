import React from "react";
import { GistLayout, Gist, FetchGistTypes } from "./useGists.interface";

import { axiosQuery } from "./../../utils/api";
export default function useGists() {
  const [gists, setGists] = React.useState<Gist[]>([]);
  const [userGists, setUserGists] = React.useState<Gist[]>([]);
  const [gist, setGist] = React.useState<Gist | null>(null);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [layoutType, setLayoutType] = React.useState(GistLayout.list);
  const [paginationState, setPaginationState] = React.useState({
    per_page: 9,
    page: 1,
  });

  const fetchGists = async ({ per_page, page, query }: FetchGistTypes) => {
    await setLoading(true);
    const response = await axiosQuery({
      url: `/gists`,
      method: "GET",
      params: { per_page, page, query },
    });
    console.log({ response });
    await setLoading(false);
    setGists(response.data);
  };

  const fetchUserGists = async ({
    per_page = 100,
    page = 1,
    username,
  }: FetchGistTypes) => {
    if (username === "") {
      setUserGists([]);
      return;
    }
    await setLoading(true);
    const response = await axiosQuery({
      url: `/users/${username}/gists`,
      method: "GET",
      params: { per_page, page },
    });

    await setLoading(false);
    setUserGists(response.data);
  };

  const setSelectedGist = async (id: string | null) => {
    if (id === null) {
      setGist(null);
      return;
    }
    await setLoading(true);
    const response = await axiosQuery({
      url: `/gists/${id}`,
      method: "GET",
    }).catch((error: string) => {
      setLoading(false);
      setError(error);
      return;
    });

    await setLoading(false);
    setGist(response.data);
  };

  React.useEffect(() => {
    fetchGists(paginationState);
  }, [paginationState]);

  return {
    gists,
    loading,
    error,
    layoutType,
    setLayoutType,
    gist,
    setSelectedGist,
    userGists,
    fetchUserGists,
    paginationState,
    setPaginationState,
  };
}
