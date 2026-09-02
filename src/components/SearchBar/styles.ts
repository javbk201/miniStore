import { StyleSheet } from 'react-native'

export const useSearchBarStyles = () => {
	const styles = StyleSheet.create({
		inputStyle: {
			borderRadius: 24,
			borderWidth: 1,
			borderColor: '#ccc',
			shadowColor: '#000',
			shadowOffset: {
				width: 0,
				height: 2
			},
			shadowOpacity: 0.1,
			shadowRadius: 4,
			elevation: 2
		}
	})
	return styles
}
