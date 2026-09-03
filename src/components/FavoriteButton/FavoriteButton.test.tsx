import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import * as eva from '@ui-kitten/eva'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { FavoriteButton } from './FavoriteButton'
import { FavoriteButtonProps } from './FavoriteButton.types'

// UI Kitten's <Icon> resolves icon names through the ApplicationProvider's
// registered icon pack, so it needs to be present in the tree even in isolation.
const renderWithProviders = (
	props: FavoriteButtonProps
): ReturnType<typeof render> =>
	render(
		<>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider {...eva} theme={eva.light}>
				<FavoriteButton {...props} />
			</ApplicationProvider>
		</>
	)

describe('FavoriteButton', () => {
	it('renders the outline heart icon when not a favorite', () => {
		const { getByLabelText } = renderWithProviders({
			isFavorite: false,
			onPress: jest.fn()
		})
		expect(getByLabelText('Añadir a favoritos')).toBeTruthy()
	})

	it('renders the filled heart icon when it is a favorite', () => {
		const { getByLabelText } = renderWithProviders({
			isFavorite: true,
			onPress: jest.fn()
		})
		expect(getByLabelText('Quitar de favoritos')).toBeTruthy()
	})

	it('calls onPress when tapped', () => {
		const onPress = jest.fn()
		const { getByLabelText } = renderWithProviders({
			isFavorite: false,
			onPress
		})
		fireEvent.press(getByLabelText('Añadir a favoritos'))
		expect(onPress).toHaveBeenCalledTimes(1)
	})
})
