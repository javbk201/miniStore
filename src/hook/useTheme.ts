import { useState, useEffect, useCallback } from 'react'
import { useColorScheme } from 'react-native'
import { storage } from '../storage/mmkv'

export type ThemeMode = 'light' | 'dark'

const THEME_STORAGE_KEY = 'app-theme-mode'

interface UseAppThemeResult {
	themeMode: ThemeMode
	toggleTheme: () => void
}

export const useAppTheme = (): UseAppThemeResult => {
	const systemScheme = useColorScheme()

	const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
		const saved = storage.getString(THEME_STORAGE_KEY)
		if (saved === 'light' || saved === 'dark') return saved
		return systemScheme === 'dark' ? 'dark' : 'light'
	})

	const toggleTheme = useCallback(() => {
		setThemeMode(prev => (prev === 'light' ? 'dark' : 'light'))
	}, [])

	useEffect(() => {
		storage.set(THEME_STORAGE_KEY, themeMode)
	}, [themeMode])

	return { themeMode, toggleTheme }
}
