import { act, renderHook } from '@testing-library/react-native'
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme'
import { useAppTheme } from '../../src/hook/useTheme'
import { storage } from '../../src/storage/mmkv'

// Mocking the top-level 'react-native' module directly (e.g. via
// jest.requireActual + spread) re-triggers real native module init code
// (TurboModuleRegistry 'DevMenu'), which crashes in the Jest environment.
// Mocking the specific internal hook module it re-exports avoids that.
jest.mock('react-native/Libraries/Utilities/useColorScheme')

jest.mock('../../src/storage/mmkv', () => ({
	storage: {
		getString: jest.fn(),
		set: jest.fn()
	}
}))

describe('useAppTheme', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('falls back to the system color scheme when nothing is stored', () => {
		;(storage.getString as jest.Mock).mockReturnValue(undefined)
		;(useColorScheme as jest.Mock).mockReturnValue('dark')

		const { result } = renderHook(() => useAppTheme())

		expect(result.current.themeMode).toBe('dark')
	})

	it('defaults to light when nothing is stored and there is no system scheme', () => {
		;(storage.getString as jest.Mock).mockReturnValue(undefined)
		;(useColorScheme as jest.Mock).mockReturnValue(null)

		const { result } = renderHook(() => useAppTheme())

		expect(result.current.themeMode).toBe('light')
	})

	it('prefers the stored theme over the system color scheme', () => {
		;(storage.getString as jest.Mock).mockReturnValue('dark')
		;(useColorScheme as jest.Mock).mockReturnValue('light')

		const { result } = renderHook(() => useAppTheme())

		expect(result.current.themeMode).toBe('dark')
	})

	it('toggleTheme flips between light and dark', () => {
		;(storage.getString as jest.Mock).mockReturnValue('light')
		;(useColorScheme as jest.Mock).mockReturnValue('light')

		const { result } = renderHook(() => useAppTheme())
		expect(result.current.themeMode).toBe('light')

		act(() => {
			result.current.toggleTheme()
		})
		expect(result.current.themeMode).toBe('dark')

		act(() => {
			result.current.toggleTheme()
		})
		expect(result.current.themeMode).toBe('light')
	})

	it('persists the theme to storage whenever it changes', () => {
		;(storage.getString as jest.Mock).mockReturnValue('light')
		;(useColorScheme as jest.Mock).mockReturnValue('light')

		const { result } = renderHook(() => useAppTheme())

		act(() => {
			result.current.toggleTheme()
		})

		expect(storage.set).toHaveBeenCalledWith('app-theme-mode', 'dark')
	})
})
