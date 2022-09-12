import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';


type GalleryHeaderBarProps = {
    filename: string,
    extension: string,
};

export default function GalleryHeaderBar({ filename, extension }: GalleryHeaderBarProps) {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text
                    ellipsizeMode='tail'
                    numberOfLines={1}
                    style={styles.title}
                    selectable={true}
                    selectionColor='orange'
                >
                    {filename}{extension}
                </Text>
                <Text>
                    1/1
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: '90%',
        flexDirection: 'row',
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    title: {
        fontSize: 20,
        color: 'black',
        fontWeight: '500',
        // backgroundColor: 'orange',
    }
})


