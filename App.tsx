import { StatusBar, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import {
	SafeAreaProvider
} from 'react-native-safe-area-context';
import * as eva from '@ui-kitten/eva'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { TabBarNavigator } from './src/navigation/TabBarNavigator'
import { ErrorBoundary } from './src/components'
import { store } from './src/store'
import { useAppTheme } from './src/hook';
import { ThemeContext } from './src/context';

function App() {
	const { themeMode, toggleTheme } = useAppTheme()

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Provider store={store}>
				<SafeAreaProvider>
					<StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} />
					<ThemeContext.Provider value={{ themeMode, toggleTheme }}>
						<IconRegistry icons={EvaIconsPack} />
						<ApplicationProvider {...eva} theme={eva[themeMode]}>
							<ErrorBoundary>
								<NavigationContainer theme={themeMode === 'dark' ? DarkTheme : DefaultTheme}>
									<TabBarNavigator />
								</NavigationContainer>
							</ErrorBoundary>
						</ApplicationProvider>

					</ThemeContext.Provider>
				</SafeAreaProvider>
			</Provider>
		</GestureHandlerRootView>
	);
}

export default App
