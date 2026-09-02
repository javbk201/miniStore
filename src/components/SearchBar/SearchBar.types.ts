export interface SearchBarProps {
	onSearch: (query: string) => void
	placeholder?: string
	debounceMs?: number
}

export interface UseSearchBar {
	rawValue: string
	handleChangeText: (text: string) => void
	handleClear: () => void
	showClearButton: boolean
}
