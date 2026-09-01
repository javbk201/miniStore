import { ViewProps, ViewStyle } from "react-native"

export interface SkeletonProps extends ViewProps {
	width?: string | number
	height?: string | number
	borderRadius?: number
	color?: string
}

export interface SkeletonHookProps extends ViewProps {
    styles: ViewStyle | {
        minWidth: number;
        minHeight: number;
        width: string | number | undefined;
        height: string | number | undefined;
        borderRadius: number;
        backgroundColor: string;
    }}