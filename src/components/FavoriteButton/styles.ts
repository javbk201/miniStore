import { StyleSheet } from 'react-native'
import { useDimensions } from '../../hook'

export const useFavoriteButtonStyles = () => {
	const { widthP } = useDimensions()
	const styles = StyleSheet.create({
		touchable: { position: 'absolute', bottom: 16, right: 16, zIndex: 10 },
		container: {
			width: widthP(12.8),
			height: widthP(12.8),
			borderRadius: 24,
			backgroundColor: '#FFFFFF',
			justifyContent: 'center',
			alignItems: 'center',
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.15,
			shadowRadius: 4,
			elevation: 3
		},
		icon: {
			width: widthP(6.9),
			height: widthP(6.9)
		}
	})
	return styles
}
