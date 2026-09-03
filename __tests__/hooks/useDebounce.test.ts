import { act, renderHook } from '@testing-library/react-native'
import { useDebounce } from '../../src/hook/useDebounce'

describe('useDebounce', () => {
	beforeEach(() => {
		jest.useFakeTimers()
	})

	afterEach(() => {
		jest.useRealTimers()
	})

	it('returns the initial value immediately', () => {
		const { result } = renderHook(() => useDebounce('initial', 300))
		expect(result.current).toBe('initial')
	})

	it('does not update before the delay has elapsed', () => {
		const { result, rerender } = renderHook(
			({ value }: { value: string }) => useDebounce(value, 300),
			{ initialProps: { value: 'first' } }
		)

		rerender({ value: 'second' })
		act(() => {
			jest.advanceTimersByTime(299)
		})

		expect(result.current).toBe('first')
	})

	it('updates to the latest value once the delay elapses', () => {
		const { result, rerender } = renderHook(
			({ value }: { value: string }) => useDebounce(value, 300),
			{ initialProps: { value: 'first' } }
		)

		rerender({ value: 'second' })
		act(() => {
			jest.advanceTimersByTime(300)
		})

		expect(result.current).toBe('second')
	})

	it('only commits the last value when it changes rapidly within the delay window', () => {
		const { result, rerender } = renderHook(
			({ value }: { value: string }) => useDebounce(value, 300),
			{ initialProps: { value: 'a' } }
		)

		// 'b' starts a 300ms timer...
		rerender({ value: 'b' })
		act(() => {
			jest.advanceTimersByTime(150)
		})
		// ...but 'c' replaces it before it fires, resetting the timer.
		rerender({ value: 'c' })
		act(() => {
			jest.advanceTimersByTime(300)
		})

		// 'b' should never have been committed, only the final value.
		expect(result.current).toBe('c')
	})
})
