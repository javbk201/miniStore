import { StyleSheet } from 'react-native'
import { useDimensions } from '../../hook'

export const useRatingStarsStyles = (size: number = 16) => {
	const { widthP } = useDimensions()
	const styles = StyleSheet.create({
		container: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: widthP(0.5)
		},
		icon: { width: size, height: size }
	})
	return styles
}
