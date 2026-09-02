import { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
	removeFavorite,
	selectFavoriteProducts
} from '../../store/favorites/favorites.slice'
import { Product } from '../../domain'
import { FavoritesNavigationProp, UseFavoritesResult } from './Favorites.types'

export const useFavorites = (): UseFavoritesResult => {
	const dispatch = useAppDispatch()
	const navigation = useNavigation<FavoritesNavigationProp>()
	const favorites = useAppSelector(selectFavoriteProducts)

	// Favorites come from Redux, already hydrated synchronously from MMKV before
	// the first render — there's no real async loading here. This just gives the
	// screen one skeleton frame on mount for visual consistency with Products/
	// ProductDetails, rather than popping straight to content with no transition.
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect -- intentional one-time mount flip (see comment above), not a data-fetch dependency chain the rule is meant to catch
		setIsLoading(false)
	}, [])

	const onRemoveFavorite = useCallback(
		(productId: number) => {
			dispatch(removeFavorite(productId))
		},
		[dispatch]
	)

	const onPressFavorite = useCallback(
		(product: Product) => {
			navigation.navigate('Detalles', { product })
		},
		[navigation]
	)

	return { favorites, isLoading, onRemoveFavorite, onPressFavorite }
}
