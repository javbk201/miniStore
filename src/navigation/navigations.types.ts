import { Product } from '../domain'

export interface RootTabParamList {
	ProductsTab: undefined
	ProductDetailsTab: { product: Product }
	FavoritesTab: undefined
}
