import React from 'react'
import { FlatList, View } from 'react-native'
import { Button, Text } from '@ui-kitten/components'
import { Product } from '../../domain'
import {
	FavoriteListItem,
	EmptyState,
	Skeleton,
	ThemedBox
} from '../../components'
import { useFavorites } from './useFavorites'
import { useFavoritesStyles } from './styles'

const keyExtractor = (item: Product): string => item.id.toString()
const skeletonKeyExtractor = (item: number): string => `skeleton-${item}`
const LABEL_BUTTON = 'Ver Productos'

export const FavoritesScreen = (): React.JSX.Element => {
	const {
		favorites,
		isLoading,
		onRemoveFavorite,
		onPressFavorite,
		navigateToProducts
	} = useFavorites()
	const styles = useFavoritesStyles()

	return (
		<ThemedBox>
			<Text category="h1">Favoritos</Text>
			{isLoading ? (
				<FlatList
					data={[1, 2, 3, 4, 5]}
					keyExtractor={skeletonKeyExtractor}
					contentContainerStyle={styles.listContent}
					renderItem={() => <Skeleton width={345} height={200} />}
				/>
			) : (
				<FlatList
					data={favorites}
					keyExtractor={keyExtractor}
					renderItem={({ item }) => (
						<FavoriteListItem
							product={item}
							onPress={onPressFavorite}
							onDelete={onRemoveFavorite}
						/>
					)}
					ListEmptyComponent={
						<View style={styles.container}>
							<EmptyState
								title="Aún no tienes favoritos"
								description="Los productos que marques con el corazón aparecerán aquí"
								children={
									<Button onPress={navigateToProducts}>
										{LABEL_BUTTON}
									</Button>
								}
							/>
						</View>
					}
					contentContainerStyle={
						favorites.length === 0
							? styles.emptyContent
							: styles.listContent
					}
					showsVerticalScrollIndicator={false}
					removeClippedSubviews
					initialNumToRender={8}
					maxToRenderPerBatch={8}
					windowSize={7}
				/>
			)}
		</ThemedBox>
	)
}
