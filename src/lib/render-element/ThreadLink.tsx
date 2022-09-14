import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
} from 'react-native';


type ThreadLinkProps = {
    children: React.ReactNode,
    href: string,
};

export default function ThreadLink({ children, href }: ThreadLinkProps) {
    const handleOnPress = () => {
        // TODO: navigate to linked Thread screen
        console.log(`Pressed on Threadlink ${href}`);
    }

    return (
        <Pressable>
            <Text style={styles.threadlink} onPress={handleOnPress}>
                {children} {"\u2192"}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    threadlink: {
        color: 'orange',
        textDecorationLine: 'underline',
    },
})