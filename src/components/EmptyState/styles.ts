import { StyleSheet } from 'react-native'

export const useEmptyStateStyles = () => {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center'
		},
		title: {
			fontSize: 16,
			fontWeight: '600',
			color: '#1A1A1A',
			textAlign: 'center'
		},
		description: {
			fontSize: 14,
			color: '#9A9A9A',
			textAlign: 'center',
			marginTop: 6
		}
	})
	return styles
}
