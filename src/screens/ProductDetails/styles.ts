import { StyleSheet } from 'react-native'
import { useDimensions } from '../../hook'

export const useProductDetailsStyles = () => {
	const { widthP, heightP } = useDimensions()
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#eae9e9',
		},
		contentWrapper: {
			flex: 1
		},
		loadingOverlay: {
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: '#eae9e9',
			paddingHorizontal: widthP(4.26),
			paddingTop: heightP(2),
		},
		skeletonBody: {
			paddingHorizontal: widthP(5.3),
			paddingTop: heightP(2),
			gap: heightP(1.5)
		},
		carouselWrapper: {
			position: 'relative'
		},
		backButton: {
			position: 'absolute',
			top: heightP(2),
			left: widthP(4),
			zIndex: 10,
			width: widthP(10.6),
			height: widthP(10.6),
			borderRadius: widthP(5.3),
			backgroundColor: '#FFFFFF',
			justifyContent: 'center',
			alignItems: 'center',
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.15,
			shadowRadius: 4,
			elevation: 3
		},
		backIcon: {
			width: widthP(5.3),
			height: widthP(5.3)
		},
		body: {
			paddingHorizontal: widthP(5.3),
			paddingTop: heightP(2)
		},
		title: {
			fontSize: 22,
			fontWeight: '700',
			color: '#1A1A1A'
		},
		category: {
			fontSize: 12,
			fontWeight: '500',
			color: '#9A9A9A',
			letterSpacing: 0.5,
			marginTop: heightP(0.5),
			marginBottom: heightP(1)
		},
		ratingRow: {
			marginBottom: heightP(1.5)
		},
		ratingHeader: {
			flexDirection: 'row',
			alignItems: 'baseline',
			justifyContent: 'space-between',
			marginBottom: heightP(0.7)
		},
		ratingLabel: {
			fontSize: 13,
			fontWeight: '700',
			color: '#1A1A1A'
		},
		ratingDetail: {
			fontSize: 12,
			color: '#9A9A9A'
		},
		priceRow: {
			flexDirection: 'row',
			alignItems: 'baseline',
			marginBottom: heightP(2)
		},
		discountedPrice: {
			fontSize: 24,
			fontWeight: '700',
			color: '#1A1A1A',
			marginRight: widthP(2)
		},
		originalPrice: {
			fontSize: 16,
			color: '#B0B0B0',
			textDecorationLine: 'line-through'
		},
		description: {
			fontSize: 14,
			lineHeight: 21,
			color: '#4A4A4A',
			marginBottom: heightP(2)
		},
		tagsContainer: {
			flexDirection: 'row',
			flexWrap: 'wrap',
			gap: widthP(2),
			marginBottom: heightP(3)
		},
		tagPill: {
			backgroundColor: '#F5F5F7',
			borderRadius: 20,
			paddingHorizontal: widthP(3),
			paddingVertical: heightP(0.7)
		},
		tagText: {
			fontSize: 12,
			fontWeight: '600',
			color: '#4A4A4A'
		},
		errorBanner: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			backgroundColor: '#FDE7EC',
			marginHorizontal: widthP(5.3),
			marginTop: heightP(1.5),
			borderRadius: 12,
			paddingHorizontal: widthP(4),
			paddingVertical: heightP(1.2)
		},
		errorText: {
			flex: 1,
			fontSize: 13,
			color: '#E0447B',
			marginRight: widthP(2)
		},
		retryButton: {
			minWidth: widthP(22)
		}
	})
	return styles
}
