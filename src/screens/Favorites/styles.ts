import { StyleSheet } from 'react-native'
import { useTheme } from '@ui-kitten/components'
import { useDimensions } from '../../hook'

export const useFavoritesStyles = () => {
	const { heightP } = useDimensions()
	const theme = useTheme()

	const styles = StyleSheet.create({
		container: {
			flex: 1,
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
