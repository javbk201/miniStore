import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { ParamListBase } from '@react-navigation/routers'
import { Product } from '../../domain'
import { RootTabParamList } from '../../navigation/navigations.types'

export interface ProductHook {
	products: Product[] | undefined
	isloading: boolean
}

export type ProductsNavigationProp = BottomTabNavigationProp<
	RootTabParamList & ParamListBase,
	'Productos'
>
