import { renderHook, act } from '@testing-library/react-native'
import { useNavigation } from '@react-navigation/native'
import { useFavorites } from './useFavorites'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { removeFavorite } from '../../store/favorites/favorites.slice'
import { Product } from '../../domain'

jest.mock('../../store/hooks', () => ({
	useAppDispatch: jest.fn(),
	useAppSelector: jest.fn()
}))

jest.mock('@react-navigation/native', () => ({
	useNavigation: jest.fn()
}))

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

describe('useFavorites', () => {
	const mockDispatch = jest.fn()
	const mockNavigate = jest.fn()

	beforeEach(() => {
		jest.clearAllMocks()
		;(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)
		;(useAppSelector as jest.Mock).mockReturnValue([mockProduct])
		;(useNavigation as jest.Mock).mockReturnValue({
			navigate: mockNavigate
		})
	})

	it('returns the favorites from selectFavoriteProducts', () => {
		const { result } = renderHook(() => useFavorites())
		expect(result.current.favorites).toEqual([mockProduct])
	})

	it('dispatches removeFavorite with the given productId', () => {
		const { result } = renderHook(() => useFavorites())
		act(() => {
			result.current.onRemoveFavorite(mockProduct.id)
		})
		expect(mockDispatch).toHaveBeenCalledWith(
			removeFavorite(mockProduct.id)
		)
	})

	it('navigates to Detalles with the pressed product', () => {
		const { result } = renderHook(() => useFavorites())
		act(() => {
			result.current.onPressFavorite(mockProduct)
		})
		expect(mockNavigate).toHaveBeenCalledWith('Detalles', {
			product: mockProduct
		})
	})

	it('starts loading and settles after mount', () => {
		const { result } = renderHook(() => useFavorites())
		expect(result.current.isLoading).toBe(false)
	})
})
