import axios from 'axios'

// Axios Composable to globally use it with the possibility to skip the interceptor if needed or use it to display addition information or errors
export default function useAxios(skipInterceptor = false) {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiUrl
  const apiToken = config.public.apiToken

  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
      'X-Jsio-Token': apiToken
    }
  })

  if (!skipInterceptor) {
    axiosInstance.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (skipInterceptor || axios.isCancel(error)) {
          return Promise.reject(error)
        } else {
          showError(error)
        }

        return Promise.reject(error)
      }
    )
  }

  return axiosInstance
}
