import type { NavigatorScreenParams } from '@react-navigation/native'

export type ProductsStackParamList = {
	ProductsList: undefined
	ProductDetail: { productId: number }
}

export interface RootTabParamList {
	ProductsTab: NavigatorScreenParams<ProductsStackParamList>
	FavoritesTab: undefined
}
