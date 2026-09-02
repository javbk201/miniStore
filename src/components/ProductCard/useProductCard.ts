import { Product } from '../../domain'
import { calculateDiscountedPrice, currencyFormatter } from '../../utils'
import { useAppSelector } from '../../store/hooks'
import { selectIsFavorite } from '../../store/favorites/favorites.slice'
import { ProductCardHookResult } from './ProductCard.types'

export function useProductCard(product: Product): ProductCardHookResult {
	const isFavorite = useAppSelector(selectIsFavorite(product.id))

	const hasDiscount = product.discountPercentage > 0
	const discountedPrice = calculateDiscountedPrice(
		product.price,
		product.discountPercentage
	)

	return {
		formattedDiscountedPrice:
			currencyFormatter(discountedPrice).format(discountedPrice),
		formattedOriginalPrice: currencyFormatter(product.price).format(
			product.price
		),
		discountLabel: `-${Math.round(product.discountPercentage)}%`,
		hasDiscount,
		isFavorite
	}
}
