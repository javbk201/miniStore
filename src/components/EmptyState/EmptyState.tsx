import React from 'react'
import { View } from 'react-native'
import { useEmptyStateStyles } from './styles'
import { Text } from '@ui-kitten/components'
import { EmptyStateProps } from './EmptyState.types'

export const EmptyState = ({ title, description, children }: EmptyStateProps) => {
	const styles = useEmptyStateStyles()
	return (
		<View style={styles.container} accessibilityRole="text">
			<Text category='s2' style={styles.title}>{title}</Text>
			{description && (
				<Text category="c1" style={styles.description}>{description}</Text>
			)}
			{children && children}
		</View>
	)
}
