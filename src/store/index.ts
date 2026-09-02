import { configureStore } from '@reduxjs/toolkit'
import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../api/axiosBaseQuery'
import favoritesReducer from './favorites/favorites.slice'
import { FavoritesState } from './favorites/favorites.slice.types'
import { favoritesListenerMiddleware } from './favorites/favorites.listener'
import { readFavoritesFromStorage } from '../storage/favoriteStorage'

export const ProductApi = createApi({
	reducerPath: 'ProductApi',
	baseQuery: axiosBaseQuery(),
	endpoints: () => ({})
})

const hydrateFavorites = (): FavoritesState => {
	const items = readFavoritesFromStorage().reduce<FavoritesState['items']>(
		(acc, product) => {
			acc[product.id] = product
			return acc
		},
		{}
	)
	return { items }
}

export const store = configureStore({
	reducer: {
		[ProductApi.reducerPath]: ProductApi.reducer,
		favorites: favoritesReducer
	},
	preloadedState: {
		favorites: hydrateFavorites()
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.prepend(favoritesListenerMiddleware.middleware)
			.concat(ProductApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
