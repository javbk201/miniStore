import { RootTabParamList } from './navigations.types'
import { TabIconNames } from './TabBarNavigator.types'

export const TAB_ICON_NAMES: Record<keyof RootTabParamList, TabIconNames> = {
	Productos: { filled: 'shopping-bag', outline: 'shopping-bag-outline' },
	Detalles: { filled: 'file-text', outline: 'file-text-outline' },
	Favoritos: { filled: 'heart', outline: 'heart-outline' }
}
