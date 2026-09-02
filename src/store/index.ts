import { configureStore } from '@reduxjs/toolkit'
import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../api/axiosBaseQuery'

export const ProductApi = createApi({
	reducerPath: 'ProductApi',
	baseQuery: axiosBaseQuery(),
	endpoints: () => ({})
})

export const store = configureStore({
	reducer: {
		[ProductApi.reducerPath]: ProductApi.reducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(ProductApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
