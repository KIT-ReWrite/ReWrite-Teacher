import axios from "axios"
import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios"

const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
})

/** 요청 인터셉터 - 토큰 자동 주입 */
apiInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("accessToken")
        const isAuthEndpoint = config.url?.includes("/auth/login") || config.url?.includes("/auth/register")

        if (token && !isAuthEndpoint) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

/** 응답 인터셉터 - 401 시 로그아웃 처리 */
apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("accessToken")
            localStorage.removeItem("user")
            window.location.href = "/login"
        }
        return Promise.reject(error)
    }
)

export const ApiHelper = {
    get: async <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
        const response: AxiosResponse<T> = await apiInstance.get(url, config)
        return response.data
    },

    post: async <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
        const response: AxiosResponse<T> = await apiInstance.post(url, data, config)
        return response.data
    },

    patch: async <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
        const response: AxiosResponse<T> = await apiInstance.patch(url, data, config)
        return response.data
    },

    put: async <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
        const response: AxiosResponse<T> = await apiInstance.put(url, data, config)
        return response.data
    },

    delete: async <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
        const response: AxiosResponse<T> = await apiInstance.delete(url, config)
        return response.data
    },

    /** multipart/form-data 전용 POST */
    postForm: async <T = unknown>(url: string, data: FormData): Promise<T> => {
        const response: AxiosResponse<T> = await apiInstance.post(url, data, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        return response.data
    },

    /** multipart/form-data 전용 PATCH */
    patchForm: async <T = unknown>(url: string, data: FormData): Promise<T> => {
        const response: AxiosResponse<T> = await apiInstance.patch(url, data, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        return response.data
    },
}
