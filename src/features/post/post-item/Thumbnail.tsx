import React, { useState } from 'react';
import {
    StyleSheet,
    Image,
    Pressable,
    View,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';


type ThumbnailProps = {
    uri: string;
    tim: number,
    filename: string,
    fileExtension: string,
    catalog: boolean,
};

export default function Thumbnail({ uri, tim, filename, fileExtension, catalog }: ThumbnailProps) {
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <Pressable onPress={() => {
                console.log(`Pressed on Thumbnail ${tim}${fileExtension}`);
                navigation.navigate('Gallery', { tim: tim, filename: filename, fileExtension: fileExtension, catalog: catalog });
            }}
            >
                <Image
                    style={styles.dimensions}
                    source={{
                        uri: uri
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

