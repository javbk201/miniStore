import React, { useCallback } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
	FavoritesScreen,
	ProductDetailsScreen,
	ProductsScreen
} from '../screens'
import { TabBarParamList } from './TabBarNavigator.types'
import { TabBarIcon } from './TabBarIcon'
import { RootTabParamList } from './navigations.types'
import { useTheme } from '@ui-kitten/components'
import FAB from '../components/FAB/FAB'

const Tab = createBottomTabNavigator<TabBarParamList>()

export const TabBarNavigator = (): React.JSX.Element => {
	const theme = useTheme()
	const TabIcons = useCallback(
		(
			name: keyof RootTabParamList,
			focused: boolean,
			color: string,
			size: number
		): React.JSX.Element => (
			<TabBarIcon
				routeName={name}
				focused={focused}
				color={color}
				size={size}
			/>
		),
		[]
	)
	return (
		<>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					headerShown: false,
					title: route.name,
					tabBarIcon: ({ focused, color, size }) =>
						TabIcons(
							route.name as keyof RootTabParamList,
							focused,
							color,
							size
						),
					tabBarAllowFontScaling: false,
					tabBarHideOnKeyboard: true,
					tabBarStyle: {
						position: 'absolute',
						backgroundColor: theme['background-basic-color-1'],
						borderStartColor: theme['background-basic-color-1'],
						borderTopWidth: 1,
						borderEndWidth: 1,
						borderStartWidth: 1,
						borderTopEndRadius: 16,
						borderTopStartRadius: 16,
						borderTopColor: 'transparent',
						borderEndColor: 'transparent'
					}
				})}
			>
				<Tab.Screen name="Productos" component={ProductsScreen} />
				<Tab.Screen
					name="Detalles"
					component={ProductDetailsScreen}
					listeners={({ navigation }) => ({
						tabPress: () => {
							navigation.setParams({ productId: undefined })
						}
					})}
				/>
				<Tab.Screen name="Favoritos" component={FavoritesScreen} />
			</Tab.Navigator>
			<FAB />
		</>
	)
}
