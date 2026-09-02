import { useSelector } from 'react-redux'
import { Product } from '../../domain'
import { calculateDiscountedPrice, currencyFormatter } from '../../utils'

export function useProductCard(product: Product) {
	//   const isFavorite = useSelector(selectIsFavorite(product.id));

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
		hasDiscount
	}
}
