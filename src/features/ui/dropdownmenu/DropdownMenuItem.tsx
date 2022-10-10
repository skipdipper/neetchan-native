import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

type DropdownMenuItemProps = {
    value: any;
    child: React.ReactNode;
    onPress?: (value: any) => void;
}

export default function DropdownMenuItem({ value, child, onPress }: DropdownMenuItemProps) {

    const handlePress = () => {
        onPress?.(value);
    }

    return (
        <Pressable
            android_ripple={{ color: '#dddddd' }}
            onPress={handlePress}
            pointerEvents='box-only'
        >
            <View style={styles.container}>
                {child}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 8
    },
});