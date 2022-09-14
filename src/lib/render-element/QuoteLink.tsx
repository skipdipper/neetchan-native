import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
} from 'react-native';


type QuoteLinkProps = {
    children: React.ReactNode,
    href: string,
};

export default function QuoteLink({ children, href }: QuoteLinkProps) {
    const handleOnPress = () => {
        // TODO: toggle modal with linked Post
        console.log(`Pressed on Quotelink ${href}`);
    }

    return (
        // TODO: Fix Pressable vertical alignment with Text
        <Pressable
            onPress={handleOnPress}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed
                        ? 'rgb(210, 230, 255)'
                        : 'transparent'
                },
            ]}>
            <Text style={styles.quotelink}>
                {children}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    quotelink: {
        color: 'orange',
        textDecorationLine: 'underline',
    },
})