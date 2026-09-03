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

	const navigateToProducts = (): void => {
		navigation.navigate('Productos', undefined)
	}

	const onPressFavorite = useCallback(
		(product: Product) => {
			navigation.navigate('Detalles', { productId: product.id })
		},
		[navigation]
	)

	return {
		favorites,
		isLoading,
		onRemoveFavorite,
		onPressFavorite,
		navigateToProducts
	}
}
