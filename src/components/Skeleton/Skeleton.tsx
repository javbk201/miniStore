import React from 'react'

import { Animated } from 'react-native'
import { useSkeleton } from './useSkeleton'
import { SkeletonProps } from './Skeleton.types'

export const Skeleton = (props: SkeletonProps): React.JSX.Element => {
	const { style } = useSkeleton(props)

	return <Animated.View {...props} style={style} />
}
