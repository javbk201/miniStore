import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Icon, Layout } from '@ui-kitten/components'
import { GestureDetector } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { ProductCard } from '../ProductCard'
import { FavoriteListItemProps } from './FavoriteListItem.types'
import { useFavoriteListItemStyles } from './styles'
import { useFavoriteListItem } from './useFavoriteListItem'

const FavoriteListItemComponent = ({
	product,
	onPress,
	onDelete
}: FavoriteListItemProps): React.JSX.Element => {
	const styles = useFavoriteListItemStyles()
	const { panGesture, animatedStyle, handleDelete } = useFavoriteListItem({
		product,
		onDelete
	})

	return (
		<Layout style={styles.wrapper}>
			<Layout style={styles.swipeAction}>
				<TouchableOpacity
					style={styles.swipeActionTouchable}
					onPress={handleDelete}
					accessibilityRole="button"
					accessibilityLabel={`Eliminar ${product.title} de favoritos deslizando`}
				>
					<Icon
						name="trash-2-outline"
						fill="#FFFFFF"
						style={styles.swipeActionIcon}
					/>
				</TouchableOpacity>
			</Layout>
			<GestureDetector gesture={panGesture}>
				<Animated.View style={[styles.cardStack, animatedStyle]}>
					<ProductCard product={product} onPress={onPress} />
				</Animated.View>
			</GestureDetector>
		</Layout>
	)
}

export const FavoriteListItem = React.memo(FavoriteListItemComponent)
