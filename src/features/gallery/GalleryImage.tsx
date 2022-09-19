import React from 'react';
import {
    StyleSheet,
    Image,
} from 'react-native';


type GalleryImageProps = {
    uri: string,
    onLoad?: () => void,
};

export default function GalleryImage({ uri, onLoad }: GalleryImageProps) {
    // TODO: Add animated GIF support
    return (
        <Image
            style={styles.image}
            source={{ uri: uri }}
            resizeMode='contain'
            onLoadEnd={onLoad}
        />
    )
}

const styles = StyleSheet.create({
    image: {
        alignSelf: 'center',
        height: '100%',
        width: '100%',
    }
});


