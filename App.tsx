import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { CatalogProvider } from './src/features/catalog/CatalogContext';
import CatalogHeaderBar from './src/features/catalog/CatalogHeaderBar';
import GalleryHeaderBar from './src/features/media-viewer/GalleryHeaderBar';
import { ScrollControllerProvider } from './src/features/media-viewer/ScrollControllerContext';
import { SearchActiveProvider } from './src/features/search/SearchActiveContext';
import { SearchProvider } from './src/features/search/SearchContext';
import { ThreadProvider } from './src/features/thread/ThreadContext';
import ThreadHeaderBar from './src/features/thread/ThreadHeaderBar';
import { ModalVisibilityProvider } from './src/features/ui/modal/ModalVisibilityContext';
import CatalogScreen from './src/screens/CatalogScreen';
import GalleryScreen from './src/screens/GalleryScreen';
import MediaViewerScreen from './src/screens/MediaViewerScreen';
import ThreadScreen from './src/screens/ThreadScreen';

// Nested Stack Navigator
// Hack to Provide separate ThreadContext for different instances of ThreadScreen and GalleryScreen
// and not single global ThreadContext
const ThreadStackScreen = () => {
  const ThreadStack = createNativeStackNavigator();

  return (
    <ThreadProvider>
      <ModalVisibilityProvider>
        <ThreadStack.Navigator>
          <ThreadStack.Screen
            name="NestedThread"
            component={ThreadScreen}
            options={({ route }: { route: any }) => ({
              header: () => <ThreadHeaderBar />
            })}
          />

          <ThreadStack.Screen name="Gallery" component={GalleryScreen} />

          <ThreadStack.Group
            screenOptions={{ presentation: 'transparentModal' }}
          >
            <ThreadStack.Screen
              name="MediaViewer"
              component={MediaViewerScreen}
              options={({ route }: { route: any }) => ({
                // TODO: use custom header component with buttons
                headerTitle: () => (
                  <GalleryHeaderBar
                    filename={route.params.filename}
                    fileExtension={route.params.fileExtension}
                  />
                )
              })}
            />
          </ThreadStack.Group>
        </ThreadStack.Navigator>
      </ModalVisibilityProvider>
    </ThreadProvider>
  );
};

const App = () => {
  const Stack = createNativeStackNavigator();

  const AppNavigation = () => (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Catalog">
        {/* Common screens */}
        <Stack.Group>
          <Stack.Screen
            name="Catalog"
            component={CatalogScreen}
            options={{
              header: () => (
                // TODO: Fix board undefined
                <CatalogHeaderBar board="a" />
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
            name="MediaViewer"
            component={MediaViewerScreen}
            options={({ route }: { route: any }) => ({
              // TODO: use custom header component with buttons
              headerTitle: () => (
                <GalleryHeaderBar
                  filename={route.params.filename}
                  fileExtension={route.params.fileExtension}
                />
              )
            })}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );

  return (
    // Provider cannot be directly wrapped around Stack.Navigator
    <CatalogProvider>
      <SearchProvider>
        <SearchActiveProvider>
          <ScrollControllerProvider>
            <ModalVisibilityProvider>
              <AppNavigation />
            </ModalVisibilityProvider>
          </ScrollControllerProvider>
        </SearchActiveProvider>
      </SearchProvider>
    </CatalogProvider>
  );
};

export default App;
