import { ViewProps, ViewStyle } from 'react-native'

export interface SkeletonProps extends ViewProps {
	width?: ViewStyle['width']
	height?: ViewStyle['height']
	borderRadius?: number
	color?: string
}

export interface SkeletonHookProps extends ViewProps {
	styles:
		| ViewStyle
		| {
				minWidth: number
				minHeight: number
				width: ViewStyle['width']
				height: ViewStyle['height']
				borderRadius: number
				backgroundColor: string
		  }
}
