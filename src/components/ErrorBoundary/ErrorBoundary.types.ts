import { ErrorInfo, ReactNode } from 'react'

export interface ErrorBoundaryProps {
	children: ReactNode
	fallback?: (error: Error, resetError: () => void) => ReactNode
	onError?: (error: Error, errorInfo: ErrorInfo) => void
}

export interface ErrorBoundaryState {
	error: Error | null
}

export interface ErrorFallbackProps {
	error: Error
	resetError: () => void
}
