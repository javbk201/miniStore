import { StyleSheet } from 'react-native'
import { useDimensions } from '../../hook'

export const useProductCardStyles = () => {
	const { widthP, heightP } = useDimensions()
	const styles = StyleSheet.create({
		container: {
			flexDirection: 'row',
			alignItems: 'center',
			backgroundColor: '#F5F5F7',
			borderRadius: 16,
			padding: 12,
			marginBottom: heightP(1.5),
			shadowColor: '#000',
			shadowOffset: {
				width: 0,
				height: 2
			},
			shadowOpacity: 0.1,
			shadowRadius: 4,
			elevation: 2
		},
		imageWrapper: {
			width: widthP(20.6),
			height: widthP(20.6),
			borderRadius: 12,
			backgroundColor: '#E8E8EC',
			justifyContent: 'center',
			alignItems: 'center',
			marginRight: widthP(3),
			overflow: 'hidden'
		},
		image: {
			width: '80%',
			height: '80%'
		},
		favoriteBadge: {
			position: 'absolute',
			top: '10%',
			right: '5%'
		},
		favoriteIcon: {
			width: widthP(4.26),
			height: heightP(2.1)
		},
		content: {
			flex: 1,
			justifyContent: 'center'
		},
		title: {
			fontSize: 15,
			fontWeight: '600',
			color: '#1A1A1A',
			lineHeight: 20
		},
		category: {
			fontSize: 11,
			fontWeight: '500',
			color: '#9A9A9A',
			letterSpacing: 0.5,
			marginTop: 4,
			marginBottom: 6
		},
		priceRow: {
			flexDirection: 'row',
			alignItems: 'baseline'
		},
		discountedPrice: {
			fontSize: 16,
			fontWeight: '700',
			color: '#1A1A1A',
			marginRight: 8
		},
		originalPrice: {
			fontSize: 13,
			color: '#B0B0B0',
			textDecorationLine: 'line-through'
		},
		discountBadge: {
			position: 'absolute',
			bottom: '15%',
			right: '5%',
			backgroundColor: '#FDE7EC',
			borderRadius: 8,
			paddingHorizontal: 8,
			paddingVertical: 4,
			alignSelf: 'flex-start'
		},
		discountText: {
			fontSize: 12,
			fontWeight: '600',
			color: '#E0447B'
		}
	})
	return styles
}
