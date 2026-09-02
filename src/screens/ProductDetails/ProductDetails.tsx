import React from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { Button, Icon, Text } from '@ui-kitten/components'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
	ImageCarousel,
	FavoriteButton,
	RatingStars,
	EmptyState,
	Skeleton
} from '../../components'
import { useProductDetail } from './useProductDetail'
import { useProductDetailsStyles } from './styles'

const RETRY_LABEL = 'Reintentar'

export const ProductDetailsScreen = (): React.JSX.Element => {
	const styles = useProductDetailsStyles()
	const {
		product,
		isError,
		refetch,
		isFavorite,
		onToggleFavorite,
		onGoBack,
		hasDiscount,
		formattedDiscountedPrice,
		formattedOriginalPrice,
		isContentReady,
		onFirstImageLoad
	} = useProductDetail()

	if (!product) {
		return (
			<SafeAreaView style={styles.container}>
				<EmptyState
					title="No hay ningún producto seleccionado"
					description="Ve a la pestaña Productos y toca un producto para ver su detalle."
				/>
			</SafeAreaView>
		)
	}

	const images =
		product.images.length > 0 ? product.images : [product.thumbnail]

	return (
		<SafeAreaView style={styles.container} edges={['top']}>
			<View style={styles.contentWrapper}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.carouselWrapper}>
						<TouchableOpacity
							onPress={onGoBack}
							style={styles.backButton}
							accessibilityRole="button"
							accessibilityLabel="Volver"
						>
							<Icon
								name="arrow-back"
								fill="#1A1A1A"
								style={styles.backIcon}
							/>
						</TouchableOpacity>
						<ImageCarousel
							images={images}
							onFirstImageLoad={onFirstImageLoad}
						/>
						<FavoriteButton
							isFavorite={isFavorite}
							onPress={onToggleFavorite}
						/>
					</View>

					{isError && (
						<View style={styles.errorBanner}>
							<Text style={styles.errorText}>
								No se pudo actualizar el producto. Mostrando
								la última información disponible.
							</Text>
							<Button
								size="tiny"
								style={styles.retryButton}
								onPress={refetch}
							>
								{RETRY_LABEL}
							</Button>
						</View>
					)}

					<View style={styles.body}>
						<Text style={styles.title}>{product.title}</Text>
						<Text style={styles.category}>
							{product.category.toUpperCase()}
						</Text>

						<View style={styles.ratingRow}>
							<View style={styles.ratingHeader}>
								<Text style={styles.ratingLabel}>Rating</Text>
								<Text style={styles.ratingDetail}>
									{product.rating.toFixed(1)} ·{' '}
									{product.reviews.length}{' '}
									{product.reviews.length === 1
										? 'reseña'
										: 'reseñas'}
								</Text>
							</View>
							<RatingStars rating={product.rating} />
						</View>

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

						<Text style={styles.description}>
							{product.description}
						</Text>

						{product.tags.length > 0 && (
							<View style={styles.tagsContainer}>
								{product.tags.map(tag => (
									<View key={tag} style={styles.tagPill}>
										<Text style={styles.tagText}>
											{tag}
										</Text>
									</View>
								))}
							</View>
						)}
					</View>
				</ScrollView>

				{!isContentReady && (
					<View style={styles.loadingOverlay}>
						<Skeleton style={{ paddingHorizontal: 20 }} height={320} borderRadius={24} />
						<View style={styles.skeletonBody}>
							<Skeleton width="70%" height={22} />
							<Skeleton width="35%" height={12} />
							<Skeleton width="50%" height={16} />
							<Skeleton width="40%" height={26} />
							<Skeleton width="100%" height={70} />
						</View>
					</View>
				)}
			</View>
		</SafeAreaView>
	)
}
