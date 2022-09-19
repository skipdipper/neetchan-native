import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import GalleryImage from '../features/gallery/GalleryImage';
import GalleryVideo from '../features/gallery/GalleryVideo';
import { AppStatusBar } from '../features/ui';


const fileUrl = (board: string, tim: number, ext: string) => `https://i.4cdn.org/${board}/${tim}${ext}`;
const thumbnailUrl = (board: string, tim: number) => `https://i.4cdn.org/${board}/${tim}s.jpg`;

type GalleryScreenProps = {
    navigation: any,
    route: any,
};

export default function GalleryScreen({ navigation, route }: GalleryScreenProps) {
    const { tim, extension } = route.params;
    const [isLoading, setIsLoading] = useState(true);

    const uri = fileUrl('a', tim, extension);
    const poster = thumbnailUrl('a', tim);

    const handleLoad = () => {
        setIsLoading(false);
    }

    const videoFormat = ['.webm', '.mp4', 'm4v', 'mpg', 'avi'];

    return (
        <SafeAreaView style={styles.container}>
            <AppStatusBar />
            {videoFormat.includes(extension)
                ? <GalleryVideo uri={uri} poster={poster} onLoad={handleLoad} />
                : <GalleryImage uri={uri} onLoad={handleLoad} />
            }

            <ActivityIndicator style={{ position: 'absolute' }}
                animating={isLoading}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(54, 54, 54, 0.9)'
    }
});