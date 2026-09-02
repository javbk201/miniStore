import React from 'react'
import { TouchableOpacity } from 'react-native'
import Animated from 'react-native-reanimated'
import { Icon } from '@ui-kitten/components'
import { FavoriteButtonProps } from './FavoriteButton.types'
import { useFavoriteButton } from './useFavoriteButton'
import { useFavoriteButtonStyles } from './styles'

export const FavoriteButton = ({
	isFavorite,
	onPress
}: FavoriteButtonProps): React.JSX.Element => {
	const styles = useFavoriteButtonStyles()
	const { animatedStyle, handlePress } = useFavoriteButton({ onPress })

	return (
		<TouchableOpacity
			onPress={handlePress}
			style={styles.touchable}
			accessibilityRole="button"
			accessibilityLabel={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
		>
			<Animated.View style={[styles.container, animatedStyle]}>
				<Icon
					name={isFavorite ? 'heart' : 'heart-outline'}
					fill={isFavorite ? '#EF4444' : '#1A1A1A'}
					style={styles.icon}
				/>
			</Animated.View>
		</TouchableOpacity>
	)
}
