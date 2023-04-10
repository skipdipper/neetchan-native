import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleProp,
  ViewStyle,
  StyleSheet,
  DrawerLayoutAndroid
} from 'react-native';
import {
  createNavigatorFactory,
  DefaultNavigatorOptions,
  ParamListBase,
  CommonActions,
  DrawerActionHelpers,
  DrawerNavigationState,
  DrawerRouter,
  DrawerRouterOptions,
  useNavigationBuilder
} from '@react-navigation/native';

// Props accepted by the view
type DrawerNavigationConfig = {
  drawerContentStyle: StyleProp<ViewStyle>;
  contentStyle: StyleProp<ViewStyle>;
  drawerContent(): JSX.Element;
};

// Supported screen options
type DrawerNavigationOptions = {
  title?: string;
  lazy?: boolean;
};

/**
 * Map of event name and the type of data (in event.data)
 * @property canPreventDefault true adds the defaultPrevented property to the emitted events.
 */
type DrawerNavigationEventMap = {
  drawerItemPress: {
    data: { isAlreadyFocused: boolean };
    canPreventDefault: true;
  };
};

// The props accepted by the component is a combination of 3 things
type Props = DefaultNavigatorOptions<
  ParamListBase,
  DrawerNavigationState<ParamListBase>,
  DrawerNavigationOptions,
  DrawerNavigationEventMap
> &
  DrawerRouterOptions &
  Partial<DrawerNavigationConfig>;

/**
 * Custom Drawer Navigator (Android only) using DrawerLayout Android.
 * Adapted from:
 *  @see https://reactnavigation.org/docs/custom-navigators
 *  @see https://github.com/react-navigation/react-navigation/blob/main/packages/drawer/src/views/DrawerView.tsx
 */
function DrawerNavigator({
  initialRouteName,
  children,
  screenOptions,
  drawerContentStyle,
  contentStyle
}: Props) {
  const { state, navigation, descriptors, NavigationContent } =
    useNavigationBuilder<
      DrawerNavigationState<ParamListBase>,
      DrawerRouterOptions,
      DrawerActionHelpers<ParamListBase>,
      DrawerNavigationOptions,
      DrawerNavigationEventMap
    >(DrawerRouter, {
      children,
      screenOptions,
      initialRouteName
    });

  const focusedRouteKey = state.routes[state.index].key;
  const [loaded, setLoaded] = useState([focusedRouteKey]);
  if (!loaded.includes(focusedRouteKey)) {
    setLoaded([...loaded, focusedRouteKey]);
  }

  const drawer = useRef<DrawerLayoutAndroid>(null);

  const navigationView = () => (
    <View style={[styles.drawerContent, drawerContentStyle]}>
      {state.routes.map(route => (
        <Pressable
          style={{ flex: 1 }}
          key={route.key}
          onPress={() => {
            const event = navigation.emit({
              type: 'drawerItemPress',
              target: route.key,
              canPreventDefault: true,
              data: {
                isAlreadyFocused: route.key === state.routes[state.index].key
              }
            });

            if (!event.defaultPrevented) {
              drawer.current?.closeDrawer();
              navigation.dispatch({
                ...CommonActions.navigate(route),
                target: state.key
              });
            }
          }}
        >
          <Text>{descriptors[route.key].options.title || route.name}</Text>
        </Pressable>
      ))}
    </View>
  );

  return (
    <NavigationContent>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition="left"
        renderNavigationView={navigationView}
      >
        <View style={[styles.content, contentStyle]}>
          {state.routes.map((route, i) => {
            const descriptor = descriptors[route.key];
            const { lazy = true } = descriptor.options;
            const isFocused = state.index === i;

            // Don't render a lazy screen if we've never navigated to it
            if (lazy && !loaded.includes(route.key) && !isFocused) {
              return null;
            }

            return (
              <View
                key={route.key}
                style={[
                  StyleSheet.absoluteFill,
                  { display: i === state.index ? 'flex' : 'none' }
                ]}
              >
                {descriptor.render()}
              </View>
            );
          })}
        </View>
      </DrawerLayoutAndroid>
    </NavigationContent>
  );
}

export const createDrawerNavigator = createNavigatorFactory<
  DrawerNavigationState<ParamListBase>,
  DrawerNavigationOptions,
  DrawerNavigationEventMap,
  typeof DrawerNavigator
>(DrawerNavigator);

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    marginTop: 16,
    marginLeft: 16
  },
  content: {
    flex: 1
  }
});
