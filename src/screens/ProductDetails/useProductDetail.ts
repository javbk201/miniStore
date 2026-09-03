import { useCallback, useState } from 'react'
import {
	useFocusEffect,
	useNavigation,
	useRoute
} from '@react-navigation/native'
import { skipToken } from '@reduxjs/toolkit/query'
import { useGetProductByIdQuery } from './ProductDetails.api'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
	selectIsFavorite,
	toggleFavorite
} from '../../store/favorites/favorites.slice'
import { calculateDiscountedPrice, currencyFormatter } from '../../utils'
import {
	ProductDetailNavigationProp,
	ProductDetailRouteProp,
	UseProductDetailResult
} from './ProductDetails.types'

export const useProductDetail = (): UseProductDetailResult => {
	const { params } = useRoute<ProductDetailRouteProp>()
	const navigation = useNavigation<ProductDetailNavigationProp>()
	const productId = params?.productId

	const {
		data: product,
		isFetching,
		isError,
		refetch
	} = useGetProductByIdQuery(productId ?? skipToken)

	const [isContentReady, setIsContentReady] = useState(false)

	useFocusEffect(
		useCallback(() => {
			setIsContentReady(false)
		}, [])
	)

	const onFirstImageLoad = useCallback(() => {
		setIsContentReady(true)
	}, [])

	const dispatch = useAppDispatch()
	const isFavorite = useAppSelector(selectIsFavorite(product?.id ?? -1))

	const onToggleFavorite = useCallback(() => {
		if (!product) return
		dispatch(toggleFavorite(product))
	}, [dispatch, product])

	const onGoBack = useCallback(() => {
		navigation.goBack()
	}, [navigation])

	const hasDiscount = product ? product.discountPercentage > 0 : false
	const discountedPrice = product
		? calculateDiscountedPrice(product.price, product.discountPercentage)
		: 0

	return {
		product,
		isLoading: isFetching,
		isError,
		refetch,
		isFavorite,
		onToggleFavorite,
		onGoBack,
		hasDiscount,
		formattedDiscountedPrice: product
			? currencyFormatter(discountedPrice).format(discountedPrice)
			: '',
		formattedOriginalPrice: product
			? currencyFormatter(product.price).format(product.price)
			: '',
		isContentReady,
		onFirstImageLoad
	}
}
