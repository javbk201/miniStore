import { StyleSheet } from 'react-native'

export const useFABStyle = () => {
	const styles = StyleSheet.create({
		container: {
			position: 'absolute',
			bottom: '10%',
			right: '5%',
			paddingHorizontal: 5,
			paddingVertical: 15,
			borderRadius: 999
		}
	})
	return styles
}