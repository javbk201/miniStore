import { useCallback } from 'react'
import { Gesture } from 'react-native-gesture-handler'
import {
	useAnimatedStyle,
	useSharedValue,
	withSpring
} from 'react-native-reanimated'
import { useDimensions } from '../../hook'
import {
	FavoriteListItemProps,
	UseFavoriteListItemResult
} from './FavoriteListItem.types'

export const useFavoriteListItem = ({
	product,
	onDelete
}: Pick<
	FavoriteListItemProps,
	'product' | 'onDelete'
>): UseFavoriteListItemResult => {
	const { widthP } = useDimensions()
	const swipeActionWidth = widthP(20)
	const translateX = useSharedValue(0)

	const startX = useSharedValue(0)

	const handleDelete = useCallback(() => {
		onDelete(product.id)
	}, [onDelete, product.id])

	const panGesture = Gesture.Pan()
		.activeOffsetX([-10, 10])
		.failOffsetY([-10, 10])
		.onStart(() => {
			startX.value = translateX.value
		})
		.onUpdate(event => {
			translateX.value = Math.min(
				0,
				Math.max(startX.value + event.translationX, -swipeActionWidth)
			)
		})
		.onEnd(() => {
			translateX.value = withSpring(
				translateX.value < -swipeActionWidth / 2 ? -swipeActionWidth : 0
			)
		})

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }]
	}))

	return { panGesture, animatedStyle, handleDelete }
}
