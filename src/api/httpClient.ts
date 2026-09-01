import axios, { AxiosError, AxiosInstance } from 'axios'
import { ApiError } from '../domain'

const BASE_URL = 'https://dummyjson.com'

export const apiClient: AxiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Accept: 'application/json'
	},
	timeout: 10000,
	validateStatus: () => true
})

apiClient.interceptors.response.use(
	response => {
		return response
	},
	(error: AxiosError) => {
		return Promise.reject(handleApiError(error))
	}
)

const handleApiError = (error: AxiosError): ApiError => {
	if (error.response) {
		const data = error.response.data as { message?: string } | undefined
		return {
			message:
				data?.message ??
				`Error del servidor (${error.response.status})`,
			status: error.response.status
		}
	}
	if (error.request) {
		return {
			message: 'No se pudo conectar. Verifica tu conexión a internet.'
		}
	}
	return { message: error.message ?? 'Ocurrió un error inesperado.' }
}
