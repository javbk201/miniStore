import { ScrollView, Text, View } from 'react-native'
import React from 'react'
import { Input } from '@ui-kitten/components'
import { useProducts } from './useProducts'

export const ProductsScreen = (): React.JSX.Element => {
	useProducts()
	return (
		<View>
			{/* Header Screen */}
			<View>
				<Text>ProductsScreen</Text>
			</View>
			{/* Search bar */}
			<View>
				<Input placeholder="Search" />
			</View>
			{/* Filters */}
			<ScrollView horizontal showsHorizontalScrollIndicator={false} />
			{/* List of products */}
		</View>
	)
}
