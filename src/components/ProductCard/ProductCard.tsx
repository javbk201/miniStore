import React from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	TurboModuleRegistry
} from 'react-native'
import { Icon } from '@ui-kitten/components'
import FastImage from "@d11/react-native-fast-image"
import { ProductCardProps } from './ProductCard.types'
import { useProductCard } from './useProductCard'
import { useProductCardStyles } from './styles'

export const ProductCard = ({ product, onPress }: ProductCardProps) => {
	const styles = useProductCardStyles()
	const {
		formattedDiscountedPrice,
		formattedOriginalPrice,
		discountLabel,
		hasDiscount
	} = useProductCard(product)

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => onPress(product.id)}
			accessibilityRole="button"
			accessibilityLabel={`Ver detalle de ${product.title}`}
		>
			<View style={styles.imageWrapper}>
				<FastImage
					source={{ 
						uri: product.thumbnail,
						priority: FastImage.priority.normal,
					 }}
					style={styles.image}
					resizeMode={FastImage.resizeMode.contain}
				/>
			</View>

			<View style={styles.content}>
				<Text
					style={styles.title}
					numberOfLines={2}
					ellipsizeMode="tail"
				>
					{product.title}
				</Text>
				<Text style={styles.category}>
					{product.category.toUpperCase()}
				</Text>

				<View style={styles.priceRow}>
					<Text style={styles.discountedPrice}>
						{formattedDiscountedPrice}
					</Text>
					{hasDiscount && (
						<Text style={styles.originalPrice}>
							{formattedOriginalPrice}
						</Text>
					)}
				</View>
			</View>

			{hasDiscount && (
				<View style={styles.discountBadge}>
					<Text style={styles.discountText}>{discountLabel}</Text>
				</View>
			)}
			{TurboModuleRegistry && (
				<View style={styles.favoriteBadge}>
					<Icon
						name="heart"
						fill="#EF4444"
						style={styles.favoriteIcon}
					/>
				</View>
			)}
		</TouchableOpacity>
	)
}
