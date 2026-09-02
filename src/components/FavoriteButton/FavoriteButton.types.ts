import { AnimatedStyle } from 'react-native-reanimated'
import { ViewStyle } from 'react-native'

export interface FavoriteButtonProps {
	isFavorite: boolean
	onPress: () => void
}

export interface UseFavoriteButtonResult {
	animatedStyle: AnimatedStyle<ViewStyle>
	handlePress: () => void
}
