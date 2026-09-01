import { StatusBar, StyleSheet, useColorScheme, View, Text } from 'react-native';
import {
	SafeAreaProvider,
	useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native'
import { TabBarNavigator } from './src/navigation/TabBarNavigator';

function App() {
	const isDarkMode = useColorScheme() === 'dark';

	return (
		<SafeAreaProvider>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
			<AppContent />
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
