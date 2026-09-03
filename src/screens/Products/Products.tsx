import { ActivityIndicator, FlatList, View } from 'react-native'
import React from 'react'
import { Button, Icon, IconProps, Text } from '@ui-kitten/components'
import { useProducts } from './useProducts'
import { useProductsStyles } from './styles'
import { SearchBar, Skeleton, ThemedBox } from '../../components'
import { ProductCard } from '../../components/ProductCard/ProductCard'
import { EmptyState } from '../../components/EmptyState'

const RETRY_LABEL = 'Reintentar'

const WifiIcon = (props: IconProps): React.JSX.Element => (
	<Icon {...props} name="wifi" />
)

const NoWifiIcon = (props: IconProps): React.JSX.Element => (
	<Icon {...props} name="wifi-off" />
)

export const ProductsScreen = (): React.JSX.Element => {
	const {
		productsData,
		productLoading,
		productsError,
		isFetchingMore,
		categoriesWithAll,
		categoriesLoading,
		categoriesError,
		refetchCategories,
		refetchProducts,
		selectedCategory,
		onPressCategory,
		onPressProduct,
		handleSearch,
		loadMore,
		conectionType
	} = useProducts()
	const styles = useProductsStyles()
	return (
		<ThemedBox>
			{/* Header Screen */}
			<View>
				<Text category="h1">Productos</Text>
				<Button style={styles.wifiIndicator} accessoryLeft={conectionType === 'WIFI' ? WifiIcon : NoWifiIcon} />
			</View>
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
						horizontal
						contentContainerStyle={styles.gap8}
						showsHorizontalScrollIndicator={false}
						renderItem={_ => (
							<Skeleton
								width={56}
								height={32}
								borderRadius={90}
							/>
						)}
					/>
				) : categoriesError ? (
					<View style={styles.categoryErrorRow}>
						<Text style={styles.categoryErrorText}>
							No se pudieron cargar las categorías
						</Text>
						<Button size="tiny" onPress={refetchCategories}>
							{RETRY_LABEL}
						</Button>
					</View>
				) : (
					<FlatList
						data={categoriesWithAll}
						horizontal
						contentContainerStyle={styles.gap8}
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
					style={styles.productContainer}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.skeletonProducts}
					renderItem={_ => <Skeleton width={345} height={200} />}
				/>
			) : productsError ? (
				<EmptyState
					title="No se pudieron cargar los productos"
					description="Revisa tu conexión e intenta nuevamente"
				>
					<Button onPress={refetchProducts}>{RETRY_LABEL}</Button>
				</EmptyState>
			) : (
				<FlatList
					data={productsData?.products}
					style={styles.productContainer}
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
		</ThemedBox>
	)
}
