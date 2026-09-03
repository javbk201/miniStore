import { calculateDiscountedPrice, currencyFormatter } from './currencyFormat'

describe('calculateDiscountedPrice', () => {
	it('applies the discount percentage to the price', () => {
		expect(calculateDiscountedPrice(100, 20)).toBe(80)
	})

	it('returns the original price when discount is 0', () => {
		expect(calculateDiscountedPrice(49.99, 0)).toBe(49.99)
	})

	it('handles fractional percentages', () => {
		expect(calculateDiscountedPrice(200, 12.5)).toBe(175)
	})
})

describe('currencyFormatter', () => {
	it('formats integer values without decimals', () => {
		const formatted = currencyFormatter(100).format(100)
		expect(formatted).toBe('$100')
	})

	it('formats fractional values with two decimals', () => {
		const formatted = currencyFormatter(99.99).format(99.99)
		expect(formatted).toBe('$99.99')
	})
})
