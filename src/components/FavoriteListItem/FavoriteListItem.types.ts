import { Gesture } from 'react-native-gesture-handler'
import { AnimatedStyle } from 'react-native-reanimated'
import { ViewStyle } from 'react-native'
import { Product } from '../../domain'

export interface FavoriteListItemProps {
	product: Product
	onPress: (product: Product) => void
	onDelete: (productId: number) => void
}

export interface UseFavoriteListItemResult {
	panGesture: ReturnType<typeof Gesture.Pan>
	animatedStyle: AnimatedStyle<ViewStyle>
	handleDelete: () => void
}
