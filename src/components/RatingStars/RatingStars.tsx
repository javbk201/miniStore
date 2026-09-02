import React from 'react'
import { View } from 'react-native'
import { Icon, useTheme } from '@ui-kitten/components'
import { RatingStarsProps } from './RatingStars.types'
import { useRatingStars } from './useRatingStars'
import { useRatingStarsStyles } from './styles'

export const RatingStars = ({
	rating,
	size = 16
}: RatingStarsProps): React.JSX.Element => {
	const styles = useRatingStarsStyles(size)
	const theme = useTheme()
	const { stars } = useRatingStars(rating)

	return (
		<View
			style={styles.container}
			accessibilityLabel={`Calificación ${rating} de 5`}
		>
			{stars.map((filled, index) => (
				<Icon
					key={index}
					name={filled ? 'star' : 'star-outline'}
					fill={theme['color-warning-600']}
					style={styles.icon}
				/>
			))}
		</View>
	)
}
