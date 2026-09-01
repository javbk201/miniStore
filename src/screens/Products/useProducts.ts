import { useEffect } from 'react'
import { useGetCategoriesQuery, useGetProductsQuery } from './Products.api'

export const useProducts = () => {
	const { data, isLoading, error } = useGetProductsQuery({
		limit: 20,
		skip: 0
	})
	const {
		data: categoriesData,
		isLoading: categoriesLoading,
		error: categoriesError
	} = useGetCategoriesQuery()
	useEffect(() => {
		console.log('Products data:', data)
		console.log('Categories data:', categoriesData)
	}, [])
}
