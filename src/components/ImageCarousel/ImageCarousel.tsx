import React from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import FastImage from '@d11/react-native-fast-image'
import { ImageCarouselProps } from './ImageCarousel.types'
import { useImageCarousel } from './useImageCarousel'
import { useImageCarouselStyles } from './styles'
import { CarouselDot } from './CarouselDot'

export const ImageCarousel = ({
	images,
	height = 320
}: ImageCarouselProps): React.JSX.Element => {
	const styles = useImageCarouselStyles(height)
	const { scrollX, onScroll, slideWidth } = useImageCarousel()

	return (
		<View style={styles.container}>
			<Animated.FlatList
				data={images}
				keyExtractor={(item, index) => `${item}-${index}`}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onScroll={onScroll}
				scrollEventThrottle={16}
				renderItem={({ item }) => (
					<View style={[styles.slide, { width: slideWidth }]}>
						<FastImage
							source={{
								uri: item,
								priority: FastImage.priority.normal,
								cache: FastImage.cacheControl.immutable
							}}
							style={styles.image}
							resizeMode={FastImage.resizeMode.contain}
						/>
					</View>
				)}
			/>
			<View style={styles.dotsContainer}>
				{images.map((_, index) => (
					<CarouselDot
						key={index}
						index={index}
						scrollX={scrollX}
						slideWidth={slideWidth}
					/>
				))}
			</View>
		</View>
	)
}
