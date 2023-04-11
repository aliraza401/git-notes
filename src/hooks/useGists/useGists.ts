import React from "react";
import {
  GistLayout,
  Gist,
  FetchGistTypes,
  GistForm,
} from "./useGists.interface";
import {
  createGist as createGistService,
  getGist as fetchGist,
  getGists,
  getUserGists,
  updateGist as updateGistService,
  starGist,
  forkGist,
  unStarGist,
  deleteGist,
} from "../../services/gistService";

import { useMessagePopup } from "../useMessagePopup/useMessagePopup";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function useGists() {
  const [gists, setGists] = React.useState<Gist[]>([]);
  const [userGists, setUserGists] = React.useState<Gist[]>([]);
  const [paginationState, setPaginationState] = React.useState({
    per_page: 9,
    page: 1,
  });
  const [gistId, setGistId] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [layoutType, setLayoutType] = React.useState(GistLayout.list);

  const { setMessagePopup } = useMessagePopup();

  const createGist = async (inputObj: GistForm) => {
    try {
      setLoading(true);
      const result = await createGistService(inputObj);
      if (result) {
        setMessagePopup("Gist created successfully");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setMessagePopup("Error create gist");
      return false;
    }
  };

  const updateGist = async (inputObj: GistForm) => {
    try {
      setLoading(true);
      const result = await updateGistService(inputObj);
      if (result) {
        setMessagePopup("Gist updated successfully");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setMessagePopup("Error updated gist");
      return false;
    }
  };

  const onStarGist = async (gistId: string) => {
    try {
      setLoading(true);
      const result = await starGist(gistId);
      if (result) {
        setMessagePopup("Gist star successfully");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setMessagePopup("Error star gist");
      return false;
    }
  };

  const onUnStarGist = async (gistId: string) => {
    try {
      setLoading(true);
      const result = await unStarGist(gistId);
      if (result) {
        setMessagePopup("Gist un-star successfully");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setMessagePopup("Error un-star gist");
      return false;
    }
  };

  const onDeleteGist = async (gistId: string) => {
    try {
      setLoading(true);
      const result = await deleteGist(gistId);
      if (result) {
        setMessagePopup("Gist deleted");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setMessagePopup("Error deleted gist");
      return false;
    }
  };

  const onForkGist = async (gistId: string) => {
    try {
      setLoading(true);
      const result = await forkGist(gistId);
      if (result) {
        setMessagePopup("Gist forked succesfully");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setMessagePopup("Error fork gist");
      return false;
    }
  };

  const fetchGists = async ({ per_page, page, query }: FetchGistTypes) => {
    setLoading(true);
    const response = await getGists({ per_page, page, query });
    if (Array.isArray(response)) setGists(response);
    setLoading(false);
  };

  const fetchUserGists = async ({
    per_page = 100,
    page = 1,
    username,
  }: FetchGistTypes) => {
    await setLoading(true);
    if (username === "") {
      setUserGists([]);
    } else {
      const response = await getUserGists({ per_page, page, username });
      if (Array.isArray(response)) setUserGists(response);
    }

    await setLoading(false);
  };

  const { data: gist } = useQuery(["gist", gistId], () => fetchGist(gistId), {
    enabled: Boolean(gistId),
  });

  const setSelectedGist = async (id: string | null) => setGistId(id);

  React.useEffect(() => {
    fetchGists(paginationState);
  }, [paginationState]);

  return {
    gists,
    loading,
    layoutType,
    setLayoutType,
    gist,
    setSelectedGist,
    userGists,
    fetchUserGists,
    paginationState,
    setPaginationState,
    createGist,
    updateGist,
    onStarGist,
    onDeleteGist,
    onForkGist,
    onUnStarGist,
  };
}
