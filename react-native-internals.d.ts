// react-native doesn't ship .d.ts files at these internal submodule paths
// (its types are consolidated at the top-level 'react-native' package entry).
// These tests mock the internal hooks directly to avoid re-triggering real
// native module init code that jest.requireActual('react-native') causes.
declare module 'react-native/Libraries/Utilities/useWindowDimensions' {
	interface ScaledSize {
		width: number
		height: number
		scale: number
		fontScale: number
	}
	export default function useWindowDimensions(): ScaledSize
}

declare module 'react-native/Libraries/Utilities/useColorScheme' {
	export default function useColorScheme(): 'light' | 'dark' | null
}
