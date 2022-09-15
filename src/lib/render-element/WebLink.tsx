import React, { useCallback } from 'react';
import {
    StyleSheet,
    Text,
    Pressable,
    Linking,
    Alert
} from 'react-native';


type WebLinkProps = {
    url: string,
};

export default function WebLink({ url }: WebLinkProps) {

    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

    return (
        <Pressable onPress={handlePress}>
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