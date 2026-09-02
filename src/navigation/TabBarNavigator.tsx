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

const Tab = createBottomTabNavigator<TabBarParamList>()

export const TabBarNavigator = (): React.JSX.Element => {
	const TabIcons = useCallback(
		(
			name: keyof RootTabParamList,
			focused: boolean,
			color: string,
			size: number
		): React.JSX.Element => (
			<TabBarIcon routeName={name} focused color={color} size={size} />
		),
		[]
	)
	return (
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
					backgroundColor: '#A9A9A9',
					borderTopWidth: 0
				}
			})}
		>
			<Tab.Screen name="Productos" component={ProductsScreen} />
			<Tab.Screen
				name="Detalles"
				component={ProductDetailsScreen}
				listeners={({ navigation }) => ({
					tabPress: () => {
						navigation.setParams({ product: undefined })
					}
				})}
			/>
			<Tab.Screen name="Favoritos" component={FavoritesScreen} />
		</Tab.Navigator>
	)
}
