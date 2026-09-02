import { StyleSheet } from 'react-native'

export const useEmptyStateStyles = () => {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			gap: 16
		},
		title: {
			fontSize: 16,
			fontWeight: '600',
			textAlign: 'center'
		},
		description: {
			fontSize: 14,
			textAlign: 'center',
			marginTop: 6
		}
	})
	return styles
}
