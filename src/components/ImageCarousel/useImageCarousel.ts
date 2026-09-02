import { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { useDimensions } from '../../hook'
import { UseImageCarouselResult } from './ImageCarousel.types'

export const useImageCarousel = (): UseImageCarouselResult => {
	const { widthP } = useDimensions()
	const slideWidth = widthP(100)
	const scrollX = useSharedValue(0)

	const onScroll = useAnimatedScrollHandler(event => {
		scrollX.value = event.contentOffset.x
	})

	return { scrollX, onScroll, slideWidth }
}
