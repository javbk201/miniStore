import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { ParamListBase } from '@react-navigation/routers'
import { SerializedError } from '@reduxjs/toolkit'
import { ApiError, Category, Product, ProductListResponse } from '../../domain'
import { RootTabParamList } from '../../navigation/navigations.types'

export interface ProductHook {
	products: Product[] | undefined
	isloading: boolean
}

export type ProductsNavigationProp = BottomTabNavigationProp<
	RootTabParamList & ParamListBase,
	'Productos'
>

export interface UseProductsResult {
	productsData: ProductListResponse | undefined
	productLoading: boolean
	productsError: ApiError | SerializedError | undefined
	isFetchingMore: boolean
	categoriesWithAll: Category[]
	categoriesLoading: boolean
	categoriesError: ApiError | SerializedError | undefined
	refetchCategories: () => void
	selectedCategory: string | null
	onPressCategory: (categorySlug: string) => void
	onPressProduct: (product: Product) => void
	handleSearch: (query: string) => void
	loadMore: () => void
}
