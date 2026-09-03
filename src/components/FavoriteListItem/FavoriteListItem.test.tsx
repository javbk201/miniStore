import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import * as eva from '@ui-kitten/eva'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { FavoriteListItem } from './FavoriteListItem'
import { FavoriteListItemProps } from './FavoriteListItem.types'
import { Product } from '../../domain'

// ProductCard (rendered inside FavoriteListItem) reads favorite status via
// useAppSelector — mocked here so this test doesn't need a real Redux store.
jest.mock('../../store/hooks', () => ({
	useAppSelector: jest.fn(() => true)
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

// UI Kitten's <Icon> needs an ApplicationProvider with a registered icon pack,
// and Swipeable needs a GestureHandlerRootView ancestor.
const renderWithProviders = (
	props: FavoriteListItemProps
): ReturnType<typeof render> =>
	render(
		<GestureHandlerRootView style={{ flex: 1 }}>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider {...eva} theme={eva.light}>
				<FavoriteListItem {...props} />
			</ApplicationProvider>
		</GestureHandlerRootView>
	)

describe('FavoriteListItem', () => {
	it('calls onDelete with the product id when the swipe action is pressed', () => {
		const onDelete = jest.fn()
		const { getByLabelText } = renderWithProviders({
			product: mockProduct,
			onPress: jest.fn(),
			onDelete
		})
		fireEvent.press(
			getByLabelText('Eliminar Test Product de favoritos deslizando')
		)
		expect(onDelete).toHaveBeenCalledWith(mockProduct.id)
	})

	it('calls onPress with the product when the card is tapped', () => {
		const onPress = jest.fn()
		const { getByLabelText } = renderWithProviders({
			product: mockProduct,
			onPress,
			onDelete: jest.fn()
		})
		fireEvent.press(getByLabelText('Ver detalle de Test Product'))
		expect(onPress).toHaveBeenCalledWith(mockProduct)
	})
})
