import { useState } from 'react'
import {
	useAnimatedScrollHandler,
	useSharedValue
} from 'react-native-reanimated'
import { useDimensions } from '../../hook'
import { UseImageCarouselResult } from './ImageCarousel.types'

export const useImageCarousel = (
	onFirstImageLoad?: () => void
): UseImageCarouselResult => {
	const { widthP } = useDimensions()
	const slideWidth = widthP(100)
	const scrollX = useSharedValue(0)
	const [isFirstImageReady, setIsFirstImageReady] = useState(false)

	const onScroll = useAnimatedScrollHandler(event => {
		scrollX.value = event.contentOffset.x
	})

	const onFirstImageLoadEnd = (): void => {
		setIsFirstImageReady(true)
		onFirstImageLoad?.()
	}

	return {
		scrollX,
		onScroll,
		slideWidth,
		isFirstImageReady,
		onFirstImageLoadEnd
	}
}
