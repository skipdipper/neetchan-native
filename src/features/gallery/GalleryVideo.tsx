import React, { useRef, useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import Video from 'react-native-video';


type GalleryVideoProps = {
    uri: string,
    poster?: string,
    onLoad?: () => void,
};

export default function GalleryVideo({ uri, poster, onLoad }: GalleryVideoProps) {
    const videoController = useRef(null);

    const [isLoading, setIsLoading] = useState(true);
    const handleLoad = () => {
        setIsLoading(false);
    }
    // TODO: Add custom video controls
    return (
        <>
            <Video
                style={styles.video}
                ref={videoController}
                source={{ uri: uri }}
                paused={false}
                controls={true}
                resizeMode='contain'
                poster={poster}
                posterResizeMode="contain"
                onLoad={handleLoad}
            />
            <ActivityIndicator style={{ position: 'absolute' }}
                animating={isLoading}
            />
        </>

    )
}

const styles = StyleSheet.create({
    video: {
        alignSelf: 'center',
        height: '100%',
        width: '100%',
    }
});


