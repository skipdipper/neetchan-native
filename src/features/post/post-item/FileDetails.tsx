import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'; import { formatBytes } from '../../../utils/formatBytes';


type FileDetailsProps = {
    filename: string,
    extension: string,
    fileSize: number,
    width: number,
    height: number
};

// File name, extension, size, dimensions
export default function FileDetails({ filename, extension, fileSize, width, height }: FileDetailsProps) {
    return (
        <View style={styles.container}>
            <Text style={[{ marginRight: 1 }, styles.textContainer]}>{filename}{extension}</Text>
            <Text style={[{ marginRight: 1 }, styles.textContainer]}>{formatBytes(fileSize, 1)}</Text>
            <Text style={styles.textContainer}>({width}x{height})</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    textContainer: {
        fontSize: 12,
    }
});
