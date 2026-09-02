import { useState, useEffect, useCallback } from 'react'
import { SearchBarProps } from './SearchBar.types'
import { useDebounce } from '../../hook'

export const useSearchBar = ({
	onSearch,
	debounceMs = 300
}: Pick<SearchBarProps, 'onSearch' | 'debounceMs'>) => {
	const [rawValue, setRawValue] = useState('')
	const debouncedValue = useDebounce(rawValue, debounceMs)

	// Dispara la búsqueda solo cuando el valor debounceado cambia, no en cada tecla
	useEffect(() => {
		onSearch(debouncedValue)
	}, [debouncedValue, onSearch])

	const handleChangeText = useCallback((text: string) => {
		setRawValue(text)
	}, [])

	const handleClear = useCallback(() => {
		setRawValue('')
	}, [])

	const showClearButton = rawValue.length > 0

	return { rawValue, handleChangeText, handleClear, showClearButton }
}
