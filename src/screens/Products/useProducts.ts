import { useCallback, useMemo, useState } from 'react'
import {
	useGetCategoriesQuery,
	useGetProductsQuery,
	useGetProductsByCategoryQuery,
	useSearchProductsQuery
} from './Products.api'
import { skipToken } from '@reduxjs/toolkit/query'

const PAGE_SIZE = 20

export const useProducts = () => {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		null
	)
	const [searchQuery, setSearchQuery] = useState('')
	const [skip, setSkip] = useState(0)

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
		selectedCategory,
		onPressCategory,
		handleSearch,
		loadMore
	}
}
