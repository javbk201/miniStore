import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../api/axiosBaseQuery'

export const ProductApi = createApi({
	reducerPath: 'ProductApi',
	baseQuery: axiosBaseQuery(),
	endpoints: () => ({})
})
