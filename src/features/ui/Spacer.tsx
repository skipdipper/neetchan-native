import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';


type SpacerProps = {
    flex?: number
};

/**
 * Spacer takes up empty space with default flex: 1 
 */
export default function Spacer({ flex = 1 }: SpacerProps) {
    return (
        <View style={{ flex: flex }}></View>
    )
}
