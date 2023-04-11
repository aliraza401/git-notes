import { axiosQuery } from "./../utils/api";

export async function getUser() {
  try {
    const response = await axiosQuery({
      url: `/user`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

export async function getToken(codeParam: string) {
  try {
    const response = await axiosQuery({
      url: `/getToken?code=${codeParam}`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    return false;
  }
}
