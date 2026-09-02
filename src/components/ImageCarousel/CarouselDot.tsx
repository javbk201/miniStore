import React from 'react'
import Animated, {
	useAnimatedStyle,
	interpolate,
	Extrapolation
} from 'react-native-reanimated'
import { CarouselDotProps } from './ImageCarousel.types'
import { useImageCarouselStyles } from './styles'
import { useDimensions } from '../../hook'

export const CarouselDot = ({
	index,
	scrollX,
	slideWidth
}: CarouselDotProps): React.JSX.Element => {
	const styles = useImageCarouselStyles()
	const { widthP } = useDimensions()
	const inactiveDotWidth = widthP(1.6)
	const activeDotWidth = widthP(4.8)

	const animatedDotStyle = useAnimatedStyle(() => {
		const inputRange = [
			(index - 1) * slideWidth,
			index * slideWidth,
			(index + 1) * slideWidth
		]
		return {
			width: interpolate(
				scrollX.value,
				inputRange,
				[inactiveDotWidth, activeDotWidth, inactiveDotWidth],
				Extrapolation.CLAMP
			),
			opacity: interpolate(
				scrollX.value,
				inputRange,
				[0.4, 1, 0.4],
				Extrapolation.CLAMP
			)
		}
	})
	return <Animated.View style={[styles.dot, animatedDotStyle]} />
}
