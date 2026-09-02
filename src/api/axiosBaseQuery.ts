import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import { ApiError, AxiosBaseQueryArgs } from '../domain'
import { apiClient } from './httpClient'

export const axiosBaseQuery =
	(): BaseQueryFn<AxiosBaseQueryArgs, unknown, ApiError> =>
	async ({ url, method = 'GET', params, data }, api) => {
		try {
			const result = await apiClient({
				url,
				method,
				params,
				data,
				signal: api.signal
			})
			return { data: result.data }
		} catch (error) {
			return { error: error as ApiError }
		}
	}
