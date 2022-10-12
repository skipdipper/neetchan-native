import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export type BoardListItemProps = {
    board: string;
    title: string;
    onPress?: () => void;
}

export default function BoardListItem({ board, title, onPress }: BoardListItemProps) {

    const handlePress = () => {
        onPress?.();
    }

    return (
        <Pressable
            android_ripple={{ color: '#dddddd' }}
            onPress={handlePress}
        >
            <View style={styles.container}>
                <Text style={styles.text}>
                    {`/${board}/ - ${title}`}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 8
    },
    text: {
        fontFamily: 'Rubik-Regular',
        fontWeight: 'bold',
        textAlignVertical: 'center'
    },
});