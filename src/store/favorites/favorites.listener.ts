import { createListenerMiddleware } from '@reduxjs/toolkit'
import type { RootState } from '../index'
import { toggleFavorite } from './favorites.slice'
import { writeFavoritesToStorage } from '../../storage/favoriteStorage'

export const favoritesListenerMiddleware = createListenerMiddleware()

favoritesListenerMiddleware.startListening({
	actionCreator: toggleFavorite,
	effect: (_action, listenerApi): void => {
		const state = listenerApi.getState() as RootState
		writeFavoritesToStorage(Object.values(state.favorites.items))
	}
})
