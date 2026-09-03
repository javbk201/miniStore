import { useCallback, useMemo, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import {
	useGetCategoriesQuery,
	useGetProductsQuery,
	useGetProductsByCategoryQuery,
	useSearchProductsQuery
} from './Products.api'
import { skipToken } from '@reduxjs/toolkit/query'
import { Product } from '../../domain'
import { NativeModules } from 'react-native'
import { ProductsNavigationProp, UseProductsResult } from './products.types'

const PAGE_SIZE = 20

export const useProducts = (): UseProductsResult => {
	const navigation = useNavigation<ProductsNavigationProp>()
	const { ConnectionStatusModule } = NativeModules
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		null
	)
	const [searchQuery, setSearchQuery] = useState('')
	const [skip, setSkip] = useState(0)
	const [conectionType, setConectionType] = useState('')

	const isDefaultListActive = !selectedCategory && !searchQuery

	const defaultProductsQuery = useGetProductsQuery(
		isDefaultListActive ? { limit: PAGE_SIZE, skip } : skipToken
	)
	const categoryProductsQuery = useGetProductsByCategoryQuery(
		selectedCategory ?? skipToken
	)
	const searchProductsQuery = useSearchProductsQuery(searchQuery || skipToken)

	const {
		data: categoriesData,
		isLoading: categoriesLoading,
		error: categoriesError,
		refetch: refetchCategories
	} = useGetCategoriesQuery()

	const activeQuery = selectedCategory
		? categoryProductsQuery
		: searchQuery
		? searchProductsQuery
		: defaultProductsQuery

	const handleSearch = useCallback((query: string) => {
		setSearchQuery(query)
		if (query) setSelectedCategory(null)
	}, [])

	const categoriesWithAll = useMemo(() => {
		if (!categoriesData) return []
		return [{ slug: 'all', name: 'Todos', url: '' }, ...categoriesData]
	}, [categoriesData])

	const onPressCategory = useCallback((categorySlug: string) => {
		setSelectedCategory(categorySlug === 'all' ? null : categorySlug)
		setSearchQuery('')
	}, [])

	const onPressProduct = useCallback(
		(product: Product) => {
			navigation.navigate('Detalles', { productId: product.id })
		},
		[navigation]
	)

	const loadMore = useCallback(() => {
		if (!isDefaultListActive) return
		if (defaultProductsQuery.isFetching) return

		const total = defaultProductsQuery.data?.total ?? 0
		const loadedCount = defaultProductsQuery.data?.products.length ?? 0
		if (loadedCount >= total) return

		setSkip(prev => prev + PAGE_SIZE)
	}, [
		isDefaultListActive,
		defaultProductsQuery.isFetching,
		defaultProductsQuery.data
	])

	const checkNetwork = useCallback(async (): Promise<void> => {
		try {
			const { name, connected } =
				await ConnectionStatusModule.checkConnectionStatus()
			if (connected) {
				setConectionType(name)
			}
		} catch (error) {
			console.error('Error al verificar la conexión', error)
		}
	}, [ConnectionStatusModule])
	useFocusEffect(
		useCallback(() => {
			checkNetwork()
		}, [checkNetwork])
	)

	return {
		productsData: activeQuery.data,
		productLoading: activeQuery.isLoading,
		productsError: activeQuery.error,
		isFetchingMore:
			isDefaultListActive && defaultProductsQuery.isFetching && skip > 0,
		categoriesWithAll,
		categoriesLoading,
		categoriesError,
		refetchCategories,
		refetchProducts: activeQuery.refetch,
		selectedCategory,
		onPressCategory,
		onPressProduct,
		handleSearch,
		loadMore,
		conectionType
	}
}
