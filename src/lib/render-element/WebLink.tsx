import React from 'react';
import {
    StyleSheet,
    Text,
    Pressable,
} from 'react-native';


type WebLinkProps = {
    url: string,
};

export default function WebLink({ url }: WebLinkProps) {
    const handleOnPress = () => {
        // TODO: Open link in WebView
        console.log(`Pressed on WebLink: ${url}`);
    }

    return (
        <Pressable onPress={handleOnPress}>
            <Text style={styles.weblink}>
                {url}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    weblink: {
        color: 'orange',
        textDecorationLine: 'underline',
    },
})