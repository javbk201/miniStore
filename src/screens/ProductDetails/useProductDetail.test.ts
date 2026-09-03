import { renderHook, act } from '@testing-library/react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { skipToken } from '@reduxjs/toolkit/query'
import { useProductDetail } from './useProductDetail'
import { useGetProductByIdQuery } from './ProductDetails.api'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Product } from '../../domain'

jest.mock('./ProductDetails.api', () => ({
	useGetProductByIdQuery: jest.fn()
}))

jest.mock('../../store/hooks', () => ({
	useAppDispatch: jest.fn(),
	useAppSelector: jest.fn()
}))

jest.mock('@react-navigation/native', () => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires -- lazy require inside a jest.mock factory (hoisted above imports, can't use an outer-scope binding)
	const { useEffect } = require('react')
	return {
		useRoute: jest.fn(),
		useNavigation: jest.fn(),
		// Real useFocusEffect subscribes to navigation focus events; for unit
		// testing purposes, running the effect once on mount (like a plain
		// useEffect) is enough to simulate "the screen is focused".
		useFocusEffect: (effect: () => void) => useEffect(effect, [])
	}
})

const mockProduct: Product = {
	id: 1,
	title: 'Test Product',
	description: 'A product for testing',
	category: 'test-category',
	price: 100,
	discountPercentage: 20,
	rating: 4.5,
	stock: 10,
	tags: ['test'],
	brand: 'TestBrand',
	sku: 'SKU-1',
	weight: 1,
	dimensions: { width: 1, height: 1, depth: 1 },
	warrantyInformation: '',
	shippingInformation: '',
	availabilityStatus: 'In Stock',
	reviews: [],
	returnPolicy: '',
	minimumOrderQuantity: 1,
	meta: { createdAt: '', updatedAt: '', barcode: '', qrCode: '' },
	thumbnail: 'thumb.png',
	images: ['image1.png']
}

describe('useProductDetail', () => {
	const mockDispatch = jest.fn()
	const mockGoBack = jest.fn()
	const mockRefetch = jest.fn()

	beforeEach(() => {
		jest.clearAllMocks()
		;(useRoute as jest.Mock).mockReturnValue({
			params: { productId: mockProduct.id }
		})
		;(useNavigation as jest.Mock).mockReturnValue({ goBack: mockGoBack })
		;(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)
		;(useAppSelector as jest.Mock).mockReturnValue(false)
		;(useGetProductByIdQuery as jest.Mock).mockReturnValue({
			data: mockProduct,
			isFetching: false,
			isError: false,
			refetch: mockRefetch
		})
	})

	it('returns the product from the query', () => {
		const { result } = renderHook(() => useProductDetail())
		expect(result.current.product).toEqual(mockProduct)
	})

	it('passes skipToken to the query when there is no productId param', () => {
		;(useRoute as jest.Mock).mockReturnValue({ params: undefined })
		;(useGetProductByIdQuery as jest.Mock).mockReturnValue({
			data: undefined,
			isFetching: false,
			isError: false,
			refetch: mockRefetch
		})

		const { result } = renderHook(() => useProductDetail())

		expect(useGetProductByIdQuery).toHaveBeenCalledWith(skipToken)
		expect(result.current.product).toBeUndefined()
	})

	it('dispatches toggleFavorite with the current product', () => {
		const { result } = renderHook(() => useProductDetail())
		act(() => {
			result.current.onToggleFavorite()
		})
		expect(mockDispatch).toHaveBeenCalledWith(
			expect.objectContaining({ payload: mockProduct })
		)
	})

	it('navigates back when onGoBack is called', () => {
		const { result } = renderHook(() => useProductDetail())
		act(() => {
			result.current.onGoBack()
		})
		expect(mockGoBack).toHaveBeenCalledTimes(1)
	})

	it('computes the discounted price from price and discountPercentage', () => {
		const { result } = renderHook(() => useProductDetail())
		expect(result.current.hasDiscount).toBe(true)
		expect(result.current.formattedDiscountedPrice).toBe('$80')
	})

	it('does not crash and returns an undefined product when the Detalles tab is opened directly (no navigation params)', () => {
		;(useRoute as jest.Mock).mockReturnValue({ params: undefined })
		;(useGetProductByIdQuery as jest.Mock).mockReturnValue({
			data: undefined,
			isFetching: false,
			isError: false,
			refetch: mockRefetch
		})

		const { result } = renderHook(() => useProductDetail())

		expect(result.current.product).toBeUndefined()
		expect(result.current.isFavorite).toBe(false)
		expect(result.current.hasDiscount).toBe(false)
		expect(result.current.formattedDiscountedPrice).toBe('')
	})

	it('does not dispatch toggleFavorite when there is no product to favorite', () => {
		;(useRoute as jest.Mock).mockReturnValue({ params: undefined })
		;(useGetProductByIdQuery as jest.Mock).mockReturnValue({
			data: undefined,
			isFetching: false,
			isError: false,
			refetch: mockRefetch
		})

		const { result } = renderHook(() => useProductDetail())
		act(() => {
			result.current.onToggleFavorite()
		})

		expect(mockDispatch).not.toHaveBeenCalled()
	})

	it('starts with content not ready on focus, regardless of whether a product is loaded', () => {
		const { result } = renderHook(() => useProductDetail())
		expect(result.current.isContentReady).toBe(false)
	})

	it('onFirstImageLoad marks content as ready', () => {
		const { result } = renderHook(() => useProductDetail())
		act(() => {
			result.current.onFirstImageLoad()
		})

		expect(result.current.isContentReady).toBe(true)
	})
})
