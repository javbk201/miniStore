import { useWindowDimensions } from "react-native"

interface DimensionsHook {
	widthP: (percentage: number) => number
	heightP: (percentage: number) => number
}

/**
 * A custom hook to get dimension values based on percentages.
 * @returns An object with functions to calculate width and height based on percentages.
 */
export const useDimensions = (): DimensionsHook => {
	const { height, width } = useWindowDimensions()
	const widthP = (percentage: number): number => (width * percentage) / 100

	const heightP = (percentage: number): number => (height * percentage) / 100

	return {
		widthP,
		heightP
	}
}
