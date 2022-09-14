import React from 'react';
import {
    StyleSheet,
    Text,
    Pressable,
} from 'react-native';


type DeadLinkProps = {
    children: React.ReactNode,
};

export default function DeadLink({ children }: DeadLinkProps) {
    const handleOnPress = () => {
        // TODO: navigate to archived WebView
        console.log(`Pressed on Deadlink`);
    }

    return (
        <Pressable onPress={handleOnPress}>
            <Text style={styles.deadlink}>
                {children}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    deadlink: {
        textDecorationLine: 'line-through',
        color: 'orange',
    }
});

