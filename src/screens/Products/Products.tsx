import { ActivityIndicator, FlatList, View } from 'react-native'
import React from 'react'
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import { useProducts } from './useProducts'
import { useProductsStyles } from './styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SearchBar, Skeleton } from '../../components'
import { ProductCard } from '../../components/ProductCard/ProductCard'
import { EmptyState } from '../../components/EmptyState'

export const ProductsScreen = (): React.JSX.Element => {
	const {
		productsData,
		productLoading,
		isFetchingMore,
		categoriesWithAll,
		categoriesLoading,
		selectedCategory,
		onPressCategory,
		onPressProduct,
		handleSearch,
		loadMore
	} = useProducts()
	const styles = useProductsStyles()
	return (
		<SafeAreaView style={styles.container} edges={['top']}>
			{/* Header Screen */}
			<Text category="h1">Productos</Text>
			{/* Search bar */}
			<View style={styles.inputContainer}>
				<SearchBar onSearch={handleSearch} />
			</View>
			{/* Filters */}
			<View style={styles.categoryContainer}>
				{categoriesLoading ? (
					<FlatList
						data={[1, 2, 3, 4, 5]}
						keyExtractor={item => `skeleton-${item}`}
						renderItem={({ item }) => <Skeleton />}
					/>
				) : (
					<FlatList
						data={categoriesWithAll}
						horizontal
						contentContainerStyle={{ gap: 8 }}
						showsHorizontalScrollIndicator={false}
						renderItem={({ item }) => (
							<Button
								appearance="filled"
								status={
									selectedCategory === item.slug ||
									(item.slug === 'all' &&
										selectedCategory === null)
										? 'primary'
										: 'basic'
								}
								size="small"
								style={styles.categoryItem}
								onPress={() => onPressCategory(item.slug)}
							>
								{item.name}
							</Button>
						)}
						keyExtractor={item => item.slug}
					/>
				)}
			</View>
			{/* List of products */}
			{productLoading ? (
				<FlatList
					data={[1, 2, 3, 4, 5]}
					renderItem={({ item }) => <Skeleton />}
				/>
			) : (
				<FlatList
					data={productsData?.products}
					style={{ paddingTop: 16 }}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => (
						<ProductCard product={item} onPress={onPressProduct} />
					)}
					ListEmptyComponent={() => (
						<EmptyState
							title="No se encontraron productos"
							description="Intenta con otro término de búsqueda"
						/>
					)}
					keyExtractor={item => item.id.toString()}
					onEndReached={loadMore}
					onEndReachedThreshold={0.5}
					ListFooterComponent={
						isFetchingMore ? (
							<ActivityIndicator size="small" />
						) : null
					}
				/>
			)}
		</SafeAreaView>
	)
}
