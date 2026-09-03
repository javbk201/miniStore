import { renderHook } from '@testing-library/react-native'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions'
import { useDimensions } from '../../src/hook/useDimensions'

// Mocking the top-level 'react-native' module directly (e.g. via
// jest.requireActual + spread) re-triggers real native module init code
// (TurboModuleRegistry 'DevMenu'), which crashes in the Jest environment.
// Mocking the specific internal hook module it re-exports avoids that.
jest.mock('react-native/Libraries/Utilities/useWindowDimensions')

describe('useDimensions', () => {
	beforeEach(() => {
		;(useWindowDimensions as jest.Mock).mockReturnValue({
			width: 400,
			height: 800,
			scale: 2,
			fontScale: 1
		})
	})

	it('computes widthP as a percentage of the current screen width', () => {
		const { result } = renderHook(() => useDimensions())
		expect(result.current.widthP(50)).toBe(200)
		expect(result.current.widthP(10)).toBe(40)
	})

	it('computes heightP as a percentage of the current screen height', () => {
		const { result } = renderHook(() => useDimensions())
		expect(result.current.heightP(25)).toBe(200)
	})

	it('reflects a different window size when useWindowDimensions changes', () => {
		;(useWindowDimensions as jest.Mock).mockReturnValue({
			width: 1000,
			height: 500,
			scale: 2,
			fontScale: 1
		})

		const { result } = renderHook(() => useDimensions())

		expect(result.current.widthP(10)).toBe(100)
		expect(result.current.heightP(10)).toBe(50)
	})
})
