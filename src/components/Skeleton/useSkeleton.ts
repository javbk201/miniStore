import { useEffect, useRef } from 'react'
import { Animated, StyleSheet, ViewStyle } from 'react-native'
import { SkeletonHookProps, SkeletonProps } from './Skeleton.types'

export const useSkeleton = (props: SkeletonProps): SkeletonHookProps => {
	const shine = useRef(new Animated.Value(0)).current

	useEffect(() => {
		const animation = Animated.loop(
			Animated.sequence([
				Animated.timing(shine, {
					toValue: 0,
					useNativeDriver: true,
					duration: 450
				}),

				Animated.timing(shine, {
					toValue: 1,
					useNativeDriver: true,
					duration: 450
				}),

				Animated.timing(shine, {
					toValue: 0,
					useNativeDriver: true,
					duration: 450
				})
			])
		)

		animation.start()
	}, [])

	const styles = StyleSheet.flatten([
		{
			opacity: shine.interpolate({
				inputRange: [0, 1],
				outputRange: [0.5, 1]
			})
		},
		{
			minWidth: 10,
			minHeight: 5,
			width: props.width,
			height: props.height,
			borderRadius: props.borderRadius ?? 6,
			backgroundColor: props.color ?? '#999999'
		},

		props.style
	])

	return {
		styles
	}
}
