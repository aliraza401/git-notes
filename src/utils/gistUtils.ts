import { AxiosError } from "axios";
import { axiosQuery } from "./api";
import { Gist, GistForm } from "../hooks/useGists/useGists.interface";

export async function isGistStarred(gistId: string) {
  try {
    const response = await axiosQuery({
      url: `/gists/${gistId}/star`,
      method: "GET",
    }).catch((error: string) => {
      return false;
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

export async function starGist(gistId: string) {
  try {
    const response = await axiosQuery({
      url: `/gists/${gistId}/star`,
      method: "PUT",
    }).catch((error: string) => {
      return false;
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function unStarGist(gistId: string) {
  try {
    const response = await axiosQuery({
      url: `/gists/${gistId}/star`,
      method: "DELETE",
    }).catch((error: string) => {
      return false;
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
    }).catch((error: AxiosError) => {
      return false;
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
    }).catch((error: AxiosError) => {
      return false;
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
    }).catch((error: AxiosError) => {
      return false;
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
    }).catch((error: AxiosError) => {
      return false;
    });
    return response.data;
  } catch (error) {
    return false;
  }
}
