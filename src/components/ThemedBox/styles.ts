import { useTheme } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'

export const useThemedBox = () => {
	const theme = useTheme()
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme['background-basic-color-1'],
			paddingHorizontal: 16
		}
	})
	return styles
}
