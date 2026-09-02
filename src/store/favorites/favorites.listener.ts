import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import type { RootState } from '../index'
import { toggleFavorite, removeFavorite } from './favorites.slice'
import { writeFavoritesToStorage } from '../../storage/favoriteStorage'

export const favoritesListenerMiddleware = createListenerMiddleware()

favoritesListenerMiddleware.startListening({
	matcher: isAnyOf(toggleFavorite, removeFavorite),
	effect: (_action, listenerApi): void => {
		const state = listenerApi.getState() as RootState
		writeFavoritesToStorage(Object.values(state.favorites.items))
	}
})
