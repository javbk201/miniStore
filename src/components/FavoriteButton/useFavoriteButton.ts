import {
	useAnimatedStyle,
	useSharedValue,
	withSequence,
	withSpring
} from 'react-native-reanimated'
import { FavoriteButtonProps, UseFavoriteButtonResult } from './FavoriteButton.types'

export const useFavoriteButton = ({
	onPress
}: Pick<FavoriteButtonProps, 'onPress'>): UseFavoriteButtonResult => {
	const scale = useSharedValue(1)

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }]
	}))

	const handlePress = (): void => {
		 
		// designed to be mutated via `.value =` to drive UI-thread animations; this is not
		// a React ref/state mutation and the rule doesn't know about Reanimated's contract.
		scale.value = withSequence(
			withSpring(1.3, { damping: 6, stiffness: 300 }),
			withSpring(1, { damping: 6, stiffness: 300 })
		)
		onPress()
	}

	return { animatedStyle, handlePress }
}
