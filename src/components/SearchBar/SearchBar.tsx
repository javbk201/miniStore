import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Input, Icon, IconProps } from '@ui-kitten/components'
import { SearchBarProps } from './SearchBar.types'
import { useSearchBar } from './useSearchBar'
import { useSearchBarStyles } from './styles'

const SearchIcon = (props: IconProps): React.JSX.Element => (
	<Icon {...props} name="search" />
)

export const SearchBar = ({
	onSearch,
	placeholder = 'Buscar productos...',
	debounceMs = 300
}: SearchBarProps): React.JSX.Element => {
	const styles = useSearchBarStyles()
	const { rawValue, handleChangeText, handleClear, showClearButton } =
		useSearchBar({
			onSearch,
			debounceMs
		})

	const renderClearIcon = (props: IconProps): React.JSX.Element =>
		showClearButton ? (
			<TouchableOpacity onPress={handleClear}>
				<Icon {...props} name="close-circle" />
			</TouchableOpacity>
		) : (
			<></>
		)

	return (
		<Input
			value={rawValue}
			style={styles.inputStyle}
			onChangeText={handleChangeText}
			placeholder={placeholder}
			accessoryLeft={SearchIcon}
			accessoryRight={renderClearIcon}
			accessibilityLabel="Buscar productos"
		/>
	)
}
