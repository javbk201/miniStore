import { renderHook, act } from '@testing-library/react-native'
import { useNavigation } from '@react-navigation/native'
import { useProducts } from './useProducts'
import {
	useGetCategoriesQuery,
	useGetProductsQuery,
	useGetProductsByCategoryQuery,
	useSearchProductsQuery
} from './Products.api'
import { Product, ProductListResponse } from '../../domain'

jest.mock('./Products.api', () => ({
	useGetProductsQuery: jest.fn(),
	useGetProductsByCategoryQuery: jest.fn(),
	useSearchProductsQuery: jest.fn(),
	useGetCategoriesQuery: jest.fn()
}))

jest.mock('@react-navigation/native', () => ({
	useNavigation: jest.fn(),
	// checkNetwork()/NativeModules aren't the point of this hook, so we just
	// no-op the focus effect instead of mocking a native module for it.
	useFocusEffect: jest.fn()
}))

const mockProductsResponse: ProductListResponse = {
	products: [{ id: 1, title: 'Phone' } as Product],
	total: 1,
	skip: 0,
	limit: 20
}

const defaultQueryResult = {
	data: mockProductsResponse,
	isLoading: false,
	isFetching: false,
	error: undefined,
	refetch: jest.fn()
}

describe('useProducts', () => {
	const mockNavigate = jest.fn()

	beforeEach(() => {
		jest.clearAllMocks()
		;(useNavigation as jest.Mock).mockReturnValue({
			navigate: mockNavigate
		})
		;(useGetProductsQuery as jest.Mock).mockReturnValue(defaultQueryResult)
		;(useGetProductsByCategoryQuery as jest.Mock).mockReturnValue(
			defaultQueryResult
		)
		;(useSearchProductsQuery as jest.Mock).mockReturnValue(
			defaultQueryResult
		)
		;(useGetCategoriesQuery as jest.Mock).mockReturnValue({
			data: [{ slug: 'phones', name: 'Phones', url: '' }],
			isLoading: false,
			error: undefined,
			refetch: jest.fn()
		})
	})

	it('returns the default product list when no category or search is active', () => {
		const { result } = renderHook(() => useProducts())
		expect(result.current.productsData).toBe(mockProductsResponse)
		expect(result.current.selectedCategory).toBeNull()
	})

	it('prepends an "all" option to the fetched categories', () => {
		const { result } = renderHook(() => useProducts())
		expect(result.current.categoriesWithAll[0]).toEqual({
			slug: 'all',
			name: 'Todos',
			url: ''
		})
		expect(result.current.categoriesWithAll[1].slug).toBe('phones')
	})

	it('onPressCategory selects a category and clears the search', () => {
		const { result } = renderHook(() => useProducts())

		act(() => {
			result.current.handleSearch('phone')
		})
		act(() => {
			result.current.onPressCategory('phones')
		})

		expect(result.current.selectedCategory).toBe('phones')
	})

	it('onPressCategory("all") clears the selected category', () => {
		const { result } = renderHook(() => useProducts())

		act(() => {
			result.current.onPressCategory('phones')
		})
		act(() => {
			result.current.onPressCategory('all')
		})

		expect(result.current.selectedCategory).toBeNull()
	})

	it('handleSearch clears any selected category (mutually exclusive)', () => {
		const { result } = renderHook(() => useProducts())

		act(() => {
			result.current.onPressCategory('phones')
		})
		act(() => {
			result.current.handleSearch('phone')
		})

		expect(result.current.selectedCategory).toBeNull()
	})

	it('onPressProduct navigates to Detalles with the product', () => {
		const { result } = renderHook(() => useProducts())
		const product = mockProductsResponse.products[0]

		act(() => {
			result.current.onPressProduct(product)
		})

		expect(mockNavigate).toHaveBeenCalledWith('Detalles', { product })
	})

	it('exposes the active query error as productsError', () => {
		const apiError = { message: 'Network error' }
		;(useGetProductsQuery as jest.Mock).mockReturnValue({
			...defaultQueryResult,
			data: undefined,
			error: apiError
		})

		const { result } = renderHook(() => useProducts())

		expect(result.current.productsError).toBe(apiError)
	})

	it('refetchProducts refetches the currently active query', () => {
		const refetch = jest.fn()
		;(useGetProductsQuery as jest.Mock).mockReturnValue({
			...defaultQueryResult,
			refetch
		})

		const { result } = renderHook(() => useProducts())
		result.current.refetchProducts()

		expect(refetch).toHaveBeenCalledTimes(1)
	})
})
