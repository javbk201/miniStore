import React from 'react'
import { useThemedBox } from './styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedBoxProps } from './ThemedBox.types'

export const ThemedBox = ({ children }: ThemedBoxProps): React.JSX.Element => {
	const styles = useThemedBox()
	return (
		<SafeAreaView style={styles.container} edges={['top']}>
			{children}
		</SafeAreaView>
	)
}
