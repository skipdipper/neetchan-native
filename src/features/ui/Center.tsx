import React from 'react';
import {
    StyleSheet,
    View,
    ViewStyle
} from 'react-native';


type CenterProps = {
    children: React.ReactNode;
    style?: ViewStyle;
};

export default function Center({ children, style }: CenterProps) {
    return (
        <View style={[styles.center, style]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});