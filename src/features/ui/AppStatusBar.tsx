import React from 'react';
import {
    StatusBar,
    useColorScheme,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';


export default function AppStatusBar() {
    const isDarkMode = useColorScheme() === 'light';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
        />
    )
}