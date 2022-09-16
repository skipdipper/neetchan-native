import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ActivityIndicator,
    Image,
} from 'react-native';
import { AppStatusBar } from '../features/ui';


const userImage = (board: string, tim: number, ext: string) => `https://i.4cdn.org/${board}/${tim}${ext}`;

type GalleryScreenProps = {
    navigation: any,
    route: any,
};

export default function GalleryScreen({ navigation, route }: GalleryScreenProps) {
    const { tim, extension } = route.params;
    const [isLoading, setIsLoading] = useState(true);

    return (
        <SafeAreaView style={styles.container}>
            <AppStatusBar />
            <Image
                // TODO: fix size to width: '100%' or height: '100%'
                style={{ width: 400, height: 400 }}
                source={{
                    uri: userImage('a', tim, extension),
                }}
                onLoadEnd={() => setIsLoading(false)}
            />
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
})