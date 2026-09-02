import { StyleSheet } from 'react-native'
import { useDimensions } from '../../hook'

export const useProductsStyles = () => {
	const { heightP, widthP } = useDimensions()
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#eae9e9',
			paddingHorizontal: 16
		},
		gap8: {
			gap: 8
		},
		inputContainer: {
			paddingVertical: 12
		},
		categoryContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			paddingVertical: 12
		},
		categoryItem: {
			borderRadius: 90,
			borderWidth: 1
		},
		productContainer: { paddingTop: 16 },
		skeletonProducts: { gap: 8, alignItems: 'center' }
	})

	return styles
}
