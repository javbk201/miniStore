import { StatusBar, useColorScheme, View, Text } from 'react-native';
import { Provider } from 'react-redux';
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
import { store } from './src/store'

function App() {
	const isDarkMode = useColorScheme() === 'dark';

	return (
		<Provider store={store}>
			<SafeAreaProvider>
				<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
				<IconRegistry icons={EvaIconsPack} />
				<ApplicationProvider {...eva} theme={eva.light}>
					<ErrorBoundary>
						<AppContent />
					</ErrorBoundary>
				</ApplicationProvider>
			</SafeAreaProvider>
		</Provider>
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
