import React, { useCallback } from 'react';
import {
    StyleSheet,
    Text,
    Linking,
    Alert
} from 'react-native';
import PressableHighlight from '../../features/ui/PressableHighlight';


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

    // TODO: Fix Pressable preventing text wrapping 
    return (
        <PressableHighlight onPress={handlePress}>
            <Text
                style={styles.weblink}
            // dataDetectorType='link'
            >
                {url}
            </Text>
        </PressableHighlight>
    );
}

const styles = StyleSheet.create({
    weblink: {
        color: 'orange',
        textDecorationLine: 'underline',
        flexShrink: 1
    },
});