import { StyleSheet } from 'react-native'
import { useDimensions } from '../../hook'

export const useImageCarouselStyles = (height: number = 320) => {
	const { widthP } = useDimensions()
	const styles = StyleSheet.create({
		container: { width: '100%' },
		slide: { justifyContent: 'center', alignItems: 'center', height },
		image: { width: '80%', height: '80%' },
		dotsContainer: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			gap: widthP(1.6),
			marginTop: widthP(3.2)
		},
		dot: {
			height: widthP(1.6),
			borderRadius: widthP(0.8),
			backgroundColor: '#1A1A1A'
		}
	})
	return styles
}
