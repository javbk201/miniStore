import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { ParamListBase } from '@react-navigation/routers'
import { Product } from '../../domain'
import { RootTabParamList } from '../../navigation/navigations.types'

export type FavoritesNavigationProp = BottomTabNavigationProp<
	RootTabParamList & ParamListBase,
	'Favoritos'
>

export interface UseFavoritesResult {
	favorites: Product[]
	isLoading: boolean
	onRemoveFavorite: (productId: number) => void
	onPressFavorite: (product: Product) => void
	navigateToProducts: () => void
}
