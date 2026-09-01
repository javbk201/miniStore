import { StyleSheet } from 'react-native'

export const useErrorBoundaryStyles = () => {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			padding: 24
		},
		title: {
			marginBottom: 8,
			textAlign: 'center'
		},
		message: {
			marginBottom: 24,
			textAlign: 'center'
		},
		button: {
			minWidth: 160
		}
	})

	return styles
}
