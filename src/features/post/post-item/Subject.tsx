import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';


type SubjectProps = {
    subject: string,
};

export default function Subject({ subject }: SubjectProps) {
    return (
        <View>
            <Text>{subject}</Text>
        </View>
    )
}