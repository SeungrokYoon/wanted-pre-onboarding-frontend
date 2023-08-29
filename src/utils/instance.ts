import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const BASE_API_URL = 'https://www.pre-onboarding-selection-task.shop'
const TOKEN_KEY_STR = 'access_token'
const withBearer = (tokenStr: string) => `Bearer ${tokenStr}`
export const UNKNOWN_ERROR = { message: 'Unknown Error' }

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem(TOKEN_KEY_STR)
  if (token !== null) config.headers.Authorization = withBearer(token)
  return config
})

export const api = {
  get: <T, D>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.get<T, AxiosResponse<T, D>, D>(url, config),
  post: <T, D>(url: string, data: D, config?: AxiosRequestConfig) =>
    axiosInstance.post<T, AxiosResponse<T, D>, D>(url, data, config),
}
