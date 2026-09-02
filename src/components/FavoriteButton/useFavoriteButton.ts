import {
	useAnimatedStyle,
	useSharedValue,
	withSequence,
	withSpring
} from 'react-native-reanimated'
import {
	FavoriteButtonProps,
	UseFavoriteButtonResult
} from './FavoriteButton.types'

export const useFavoriteButton = ({
	onPress
}: Pick<FavoriteButtonProps, 'onPress'>): UseFavoriteButtonResult => {
	const scale = useSharedValue(1)

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }]
	}))

	const handlePress = (): void => {
		// eslint-disable-next-line react-hooks/immutability -- Reanimated SharedValue.value assignment drives UI-thread animations; it is not a React ref/state mutation.
		scale.value = withSequence(
			withSpring(1.3, { damping: 6, stiffness: 300 }),
			withSpring(1, { damping: 6, stiffness: 300 })
		)
		onPress()
	}

	return { animatedStyle, handlePress }
}
