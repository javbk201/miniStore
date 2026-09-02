import { SharedValue, ScrollHandlerProcessed } from 'react-native-reanimated'

export interface ImageCarouselProps {
	images: string[]
	height?: number
	onFirstImageLoad?: () => void
}

export interface CarouselDotProps {
	index: number
	scrollX: SharedValue<number>
	slideWidth: number
}

export interface UseImageCarouselResult {
	scrollX: SharedValue<number>
	onScroll: ScrollHandlerProcessed
	slideWidth: number
	isFirstImageReady: boolean
	onFirstImageLoadEnd: () => void
}
