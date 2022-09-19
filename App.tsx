import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CatalogScreen from './src/screens/CatalogScreen';
import GalleryScreen from './src/screens/GalleryScreen';
import ThreadScreen from './src/screens/ThreadScreen';
import GalleryHeaderBar from './src/features/gallery/GalleryHeaderBar';
import { CatalogProvider } from './src/features/catalog/CatalogContext';
import { SearchProvider } from './src/features/search/SearchContext';
import { SearchActiveProvider } from './src/features/search/SearchActiveContext';
import CatalogHeaderBar from './src/features/catalog/CatalogHeaderBar';
import { ThreadProvider } from './src/features/thread/ThreadContext';

// Nested Stack Navigator
// Hack to Provide separate ThreadContext for different instances of ThreadScreen and GalleryScreen
// and not single global ThreadContext 
const ThreadStackScreen = () => {
  const ThreadStack = createNativeStackNavigator();

  return (
    <ThreadProvider>
      <ThreadStack.Navigator>
        <ThreadStack.Screen
          name="NestedThread"
          component={ThreadScreen}
          options={({ route }: { route: any }) => ({ title: String(route.params.no) })}
        />

        <ThreadStack.Group screenOptions={{ presentation: 'transparentModal' }}>
          <ThreadStack.Screen
            name="Gallery"
            component={GalleryScreen}
            options={({ route }: { route: any }) => ({
              // TODO: use custom header component with buttons
              headerTitle: () => (
                <GalleryHeaderBar
                  filename={route.params.filename}
                  extension={route.params.extension}
                />
              ),

            })}
          />
        </ThreadStack.Group>
      </ThreadStack.Navigator>
    </ThreadProvider>
  );
}

const App = () => {
  const Stack = createNativeStackNavigator();

  const AppNavigation = () => (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Catalog"
      >
        {/* Common screens */}
        <Stack.Group>
          <Stack.Screen
            name="Catalog"
            component={CatalogScreen}
            options={{
              header: () => (
                <CatalogHeaderBar />
              )
            }}
          />

          <Stack.Screen
            name="Thread"
            // component={ThreadScreen}
            component={ThreadStackScreen}
            options={{ headerShown: false }}
          // options={({ route }: { route: any }) => ({ title: String(route.params.no) })}
          />
        </Stack.Group>

        {/* Common modal screens */}
        <Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
          <Stack.Screen
            name="Gallery"
            component={GalleryScreen}
            options={({ route }: { route: any }) => ({
              // TODO: use custom header component with buttons
              headerTitle: () => (
                <GalleryHeaderBar
                  filename={route.params.filename}
                  extension={route.params.extension}
                />
              ),
            })}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )

  return (
    // Provider cannot be directly wrapped around Stack.Navigator
    <CatalogProvider>
      <SearchProvider>
        <SearchActiveProvider>
          <AppNavigation />
        </SearchActiveProvider>
      </SearchProvider>
    </CatalogProvider>
  )
};

export default App;
