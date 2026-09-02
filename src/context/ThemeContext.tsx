import React, { createContext, useContext } from 'react'
import { ThemeMode } from '../hook'

interface ThemeContextValue {
	themeMode: ThemeMode
	toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue>({
	themeMode: 'light',
	toggleTheme: () => {}
})

export const useThemeContext = () => useContext(ThemeContext)
