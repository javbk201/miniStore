import React, { Component, ErrorInfo, JSX } from 'react'
import { Button, Layout, Text } from '@ui-kitten/components'
import { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.types'
import { useErrorBoundaryStyles } from './styles'

interface ErrorFallbackProps {
	error: Error
	resetError: () => void
}

const RETRY_LABEL = 'Reintentar'

const ErrorFallback = ({
	error,
	resetError
}: ErrorFallbackProps): JSX.Element => {
	const styles = useErrorBoundaryStyles()

	return (
		<Layout style={styles.container}>
			<Text category="h6" style={styles.title}>
				Algo salió mal
			</Text>
			<Text appearance="hint" style={styles.message}>
				{error.message || 'Ocurrió un error inesperado.'}
			</Text>
			<Button style={styles.button} onPress={resetError}>
				{RETRY_LABEL}
			</Button>
		</Layout>
	)
}

export class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	state: ErrorBoundaryState = {
		error: null
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { error }
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		if (this.props.onError) {
			this.props.onError(error, errorInfo)
		} else if (__DEV__) {
			console.error('ErrorBoundary caught an error:', error, errorInfo)
		}
	}

	resetError = (): void => {
		this.setState({ error: null })
	}

	render(): React.ReactNode {
		const { error } = this.state
		const { children, fallback } = this.props

		if (error) {
			if (fallback) {
				return fallback(error, this.resetError)
			}

			return <ErrorFallback error={error} resetError={this.resetError} />
		}

		return children
	}
}
