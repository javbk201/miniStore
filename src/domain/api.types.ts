import { AxiosRequestConfig } from 'axios'

export interface ApiError {
	message: string
	status?: number
}

export interface AxiosBaseQueryArgs {
	url: string
	method?: AxiosRequestConfig['method']
	params?: AxiosRequestConfig['params']
	data?: AxiosRequestConfig['data']
}
