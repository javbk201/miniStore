import { Product } from '../../domain'

export interface ProductCardProps {
	product: Product
	onPress: (productId: number) => void
}
