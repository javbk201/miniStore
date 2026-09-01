import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FavoritesScreen, ProductDetailsScreen, ProductsScreen } from '../screens'

const Tab = createBottomTabNavigator()

export const TabBarNavigator = (): React.JSX.Element => {
	return (
		<Tab.Navigator screenOptions={({ route }) => ({
			headerShown: false,
			title: route.name,
			tabBarAllowFontScaling: false,
			tabBarHideOnKeyboard: true,
			tabBarStyle: {
				backgroundColor: '#A9A9A9',
				borderTopWidth: 0,
			}
		})}>
			<Tab.Screen name="ProductsTab" component={ProductsScreen} />
			<Tab.Screen name="ProductDetailsTab" component={ProductDetailsScreen} />
			<Tab.Screen name="FavoritesTab" component={FavoritesScreen} />
		</Tab.Navigator>
	)
}