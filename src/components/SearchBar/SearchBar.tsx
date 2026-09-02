import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Input, Icon, IconProps } from '@ui-kitten/components'
import { SearchBarProps } from './SearchBar.types'
import { useSearchBar } from './useSearchBar'

const SearchIcon = (props: IconProps) => <Icon {...props} name="search" />

export const SearchBar = ({
	onSearch,
	placeholder = 'Buscar productos...',
	debounceMs = 300
}: SearchBarProps) => {
	const { rawValue, handleChangeText, handleClear, showClearButton } =
		useSearchBar({
			onSearch,
			debounceMs
		})

	const renderClearIcon = (props: IconProps) =>
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
			style={{
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
			}}
			onChangeText={handleChangeText}
			placeholder={placeholder}
			accessoryLeft={SearchIcon}
			accessoryRight={renderClearIcon}
			accessibilityLabel="Buscar productos"
		/>
	)
}
