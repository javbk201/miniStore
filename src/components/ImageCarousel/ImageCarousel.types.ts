import { SharedValue, ScrollHandlerProcessed } from 'react-native-reanimated'

export interface ImageCarouselProps {
	images: string[]
	height?: number
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
}
