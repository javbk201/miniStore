import React from 'react'
import { Button, Icon } from '@ui-kitten/components'
import { useThemeContext } from '../../context'
import { useFABStyle } from './styles'

const FAB = (): React.JSX.Element => {
	const { themeMode, toggleTheme } = useThemeContext()
	const styles = useFABStyle()
	return (
		<Button
			style={styles.container}
			accessibilityLabel="Alternar modo oscuro"
			accessoryLeft={props => (
				<Icon
					{...props}
					name={themeMode === 'dark' ? 'moon-outline' : 'sun-outline'}
				/>
			)}
			onPress={toggleTheme}
			size="medium"
		/>
	)
}

export default FAB
