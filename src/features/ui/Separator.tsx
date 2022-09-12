import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';


export default function Separator() {
    return (
        <View style={styles.separator}></View>
    )
}

const styles = StyleSheet.create({
    separator: {
        margin: 4,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});