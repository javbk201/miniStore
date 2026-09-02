export const currencyFormatter = (value: number): Intl.NumberFormat => {
	let nf
	if (value % 1 > 0) {
		nf = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		})
	} else {
		nf = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0
		})
	}
	return nf
}

export const calculateDiscountedPrice = (
	price: number,
	discountPercentage: number
): number => {
	return price - (price * discountPercentage) / 100
}
