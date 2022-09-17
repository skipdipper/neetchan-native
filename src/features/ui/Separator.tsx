import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';


type SeparatorProps = {
    direction?: 'horizontal' | 'vertical';
};

export default function Separator({ direction = 'horizontal' }: SeparatorProps) {
    return (
        <View style={direction === 'horizontal' ? styles.horizontal : styles.vertical}></View>
    )
}

const styles = StyleSheet.create({
    horizontal: {
        margin: 4,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    vertical: {
        margin: 4,
        borderRightColor: '#737373',
        borderRightWidth: StyleSheet.hairlineWidth,
    },
});