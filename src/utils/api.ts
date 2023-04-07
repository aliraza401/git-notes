import Axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";

const baseApiPath = process.env.REACT_APP_SERVER;
const axiosClient = Axios.create({
  baseURL: baseApiPath,
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use((request: any) => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers = { ...request.headers, authorization: token };
  }
  return request;
});

interface Query {
  url: string;
  method?: Method;
  formData?: boolean;
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
}

interface AxiosQueryResponse<T> {
  data: T;
}

export const axiosQuery: any = async <T>(
  query: Query
): Promise<AxiosQueryResponse<T>> => {
  let {
    url,
    method = "GET",
    data = undefined,
    params = undefined,
    headers,
  } = query;
  const result = await axiosClient
    .request({
      url,
      method,
      data,
      params,
      headers,
    })
    .catch((error: any) => {
      throw error?.data?.message ?? error?.message ?? "Something went wrong";
    });

  return { data: result.data };
};
