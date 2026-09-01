import { StatusBar, StyleSheet, useColorScheme, View, Text } from 'react-native';
import {
	SafeAreaProvider,
	useSafeAreaInsets,
} from 'react-native-safe-area-context';
import * as eva from '@ui-kitten/eva'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { NavigationContainer } from '@react-navigation/native'
import { TabBarNavigator } from './src/navigation/TabBarNavigator'
import { ErrorBoundary } from './src/components'

function App() {
	const isDarkMode = useColorScheme() === 'dark';

	return (
		<SafeAreaProvider>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider {...eva} theme={eva.light}>
				<ErrorBoundary>
					<AppContent />
				</ErrorBoundary>
      		</ApplicationProvider>
		</SafeAreaProvider>
	);
}

function AppContent() {
	const safeAreaInsets = useSafeAreaInsets();

	return (
		<NavigationContainer>
			<TabBarNavigator />
		</NavigationContainer>
	);
}

export default App;
