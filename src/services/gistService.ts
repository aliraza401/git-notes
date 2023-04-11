import { AxiosError } from "axios";
import { axiosQuery } from "./../utils/api";
import {
  FetchGistTypes,
  Gist,
  GistForm,
} from "../hooks/useGists/useGists.interface";
import { fileReader } from "../utils/fileReader";

export async function isGistStarred(gistId: string) {
  try {
    const response = await axiosQuery({
      url: `/gists/${gistId}/star`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

export async function starGist(gistId: string) {
  try {
    await axiosQuery({
      url: `/gists/${gistId}/star`,
      method: "PUT",
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function unStarGist(gistId: string) {
  try {
    await axiosQuery({
      url: `/gists/${gistId}/star`,
      method: "DELETE",
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function createGist(payload: GistForm) {
  try {
    const response = await axiosQuery({
      url: `/gists`,
      method: "POST",

      data: {
        ...payload,
      },
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

export async function updateGist(payload: GistForm) {
  try {
    const response = await axiosQuery({
      url: `/gists/${payload.id}`,
      method: "PATCH",

      data: {
        ...payload,
      },
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

export async function deleteGist(gistId: string) {
  try {
    await axiosQuery({
      url: `/gists/${gistId}`,
      method: "DELETE",
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function forkGist(gistId: string) {
  try {
    const response = await axiosQuery({
      url: `/gists/${gistId}/fork`,
      method: "POST",
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

export async function getGist(gistId: string | null) {
  try {
    if (!gistId) return false;
    const response = await axiosQuery({
      url: `/gists/${gistId}`,
      method: "GET",
    });
    const gistData = response.data;
    const fileUrl = gistData.files[Object.keys(gistData.files)[0]].raw_url;
    gistData.isGistStarred = await isGistStarred(gistData.id);
    gistData.content = await fileReader({ fileUrl });
    return gistData;
  } catch (error) {
    return false;
  }
}

export async function getGists({ per_page, page, query }: FetchGistTypes) {
  try {
    const response = await axiosQuery({
      url: `/gists`,
      method: "GET",
      params: { per_page, page, query },
    });
    const gistsData: Gist[] = await Promise.all(
      response.data.map(async (gistData: Gist) => {
        const fileUrl = gistData.files[Object.keys(gistData.files)[0]].raw_url;
        gistData.isGistStarred = await isGistStarred(gistData.id);
        gistData.content = await fileReader({ fileUrl });
        return gistData;
      })
    );
    return gistsData;
  } catch (error) {
    return false;
  }
}

export async function getUserGists({
  per_page = 100,
  page = 1,
  username,
}: FetchGistTypes) {
  try {
    const response = await axiosQuery({
      url: `/users/${username}/gists`,
      method: "GET",
      params: { per_page, page },
    });
    const gistsData: Gist[] = await Promise.all(
      response.data.map(async (gistData: Gist) => {
        const fileUrl = gistData.files[Object.keys(gistData.files)[0]].raw_url;
        gistData.isGistStarred = await isGistStarred(gistData.id);
        gistData.content = await fileReader({ fileUrl });
        return gistData;
      })
    );
    return gistsData;
  } catch (error) {
    return false;
  }
}
