import { StyleSheet } from 'react-native'
import { useDimensions } from '../../hook'

export const useFavoritesStyles = () => {
	const { heightP } = useDimensions()
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#eae9e9',
			paddingHorizontal: 16
		},
		listContent: {
			paddingTop: heightP(2),
			paddingBottom: heightP(2)
		},
		emptyContent: {
			flexGrow: 1
		}
	})
	return styles
}
