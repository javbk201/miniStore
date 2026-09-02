import { Product } from '../../domain'

export interface ProductCardProps {
	product: Product
	onPress: (product: Product) => void
}

export interface ProductCardHookResult {
	formattedDiscountedPrice: string
	formattedOriginalPrice: string
	discountLabel: string
	hasDiscount: boolean
	isFavorite: boolean
}
