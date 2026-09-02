import React from 'react'
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
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				title: route.name,
				tabBarIcon: ({ focused, color, size }) => (
					<TabBarIcon
						routeName={route.name as keyof RootTabParamList}
						focused={focused}
						color={color}
						size={size}
					/>
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
			<Tab.Screen name="Detalles" component={ProductDetailsScreen} />
			<Tab.Screen name="Favoritos" component={FavoritesScreen} />
		</Tab.Navigator>
	)
}
