import { RouteProp } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { ParamListBase } from '@react-navigation/routers'
import { Product } from '../../domain'
import { RootTabParamList } from '../../navigation/navigations.types'

export type ProductDetailRouteProp = RouteProp<
	RootTabParamList & ParamListBase,
	'Detalles'
>

export type ProductDetailNavigationProp = BottomTabNavigationProp<
	RootTabParamList & ParamListBase,
	'Detalles'
>

export interface UseProductDetailResult {
	product: Product | undefined
	isLoading: boolean
	isError: boolean
	refetch: () => void
	isFavorite: boolean
	onToggleFavorite: () => void
	onGoBack: () => void
	hasDiscount: boolean
	formattedDiscountedPrice: string
	formattedOriginalPrice: string
}
