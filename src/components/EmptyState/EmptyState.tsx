import React from 'react'
import { View, Text } from 'react-native'
import { useEmptyStateStyles } from './styles'

export const EmptyState = ({ title, description }: EmptyStateProps) => {
	const styles = useEmptyStateStyles()
	return (
		<View style={styles.container} accessibilityRole="text">
			<Text style={styles.title}>{title}</Text>
			{description && (
				<Text style={styles.description}>{description}</Text>
			)}
		</View>
	)
}
