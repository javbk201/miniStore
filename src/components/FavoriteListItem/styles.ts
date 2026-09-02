import { StyleSheet } from 'react-native'
import { useDimensions } from '../../hook'

export const useFavoriteListItemStyles = () => {
	const { widthP, heightP } = useDimensions()
	const styles = StyleSheet.create({
		wrapper: {
			overflow: 'hidden'
		},
		swipeAction: {
			position: 'absolute',
			top: 0,
			right: 0,
			bottom: 0,
			width: widthP(20),
			backgroundColor: '#EF4444',
			borderRadius: 16,
			marginBottom: heightP(1.5)
		},
		swipeActionTouchable: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center'
		},
		swipeActionIcon: {
			width: widthP(7),
			height: widthP(7)
		},
		cardStack: {
			position: 'relative'
		},
		deleteButtonOverlay: {
			position: 'absolute',
			top: 0,
			bottom: 0,
			right: widthP(3),
			marginBottom: heightP(1.5),
			justifyContent: 'center',
			alignItems: 'center'
		},
		deleteButton: {
			width: widthP(6),
			height: widthP(6),
			borderRadius: widthP(4.5),
			backgroundColor: '#FFFFFF',
			justifyContent: 'center',
			alignItems: 'center',
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 1 },
			shadowOpacity: 0.15,
			shadowRadius: 2,
			elevation: 2
		}
	})
	return styles
}
