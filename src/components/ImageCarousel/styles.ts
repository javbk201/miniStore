import { StyleSheet } from 'react-native'
import { useDimensions } from '../../hook'
import { useTheme } from '@ui-kitten/components'

export const useImageCarouselStyles = (height: number = 320) => {
	const { widthP } = useDimensions()
	const theme = useTheme()
	const styles = StyleSheet.create({
		container: { width: '100%' },
		slide: { justifyContent: 'center', alignItems: 'center', height },
		image: { width: '80%', height: '80%' },
		loadingOverlay: {
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			height
		},
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
			backgroundColor: theme['color-primary-100']
		}
	})
	return styles
}
