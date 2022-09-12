import React, { useState } from 'react';
import {
    StyleSheet,
    Image,
    Pressable,
    View,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';


const thumbnailUrl = (board: string, tim: number) => `https://i.4cdn.org/${board}/${tim}s.jpg`;

type ThumbnailProps = {
    tim: number,
    filename: string,
    extension: string,
};

export default function Thumbnail({ tim, filename, extension }: ThumbnailProps) {
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <Pressable onPress={() => {
                console.log(`Pressed on Thumbnail ${tim}${extension}`);
                navigation.navigate('Gallery', { tim: tim, filename: filename, extension: extension });
            }}
            >
                <Image
                    style={styles.dimensions}
                    source={{
                        uri: thumbnailUrl('a', tim),
                    }}
                    onLoadEnd={() => setIsLoading(false)}
                />
            </Pressable>

            {isLoading &&
                <ActivityIndicator style={{ position: 'absolute' }}
                    animating={isLoading}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#dddddd',
        // Centering activity indicator
        alignItems: 'center',
        justifyContent: 'center'
    },
    dimensions: {
        width: 80,
        height: 90,
    },
})

