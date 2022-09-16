import React from 'react';
import {
    StyleSheet,
    Text,
    Pressable
} from 'react-native';


type SubjectProps = {
    replies: Set<number>
};

export default function Replies({ replies }: SubjectProps) {
    const handlePress = () => {
        // TODO: Open Modal displaying a list of Post replies
        console.log('Pressed on Repies');
    }

    return (
        <Pressable onPress={handlePress}>
            <Text>{replies.size} {replies.size == 1 ? `reply` : `replies`}</Text>
        </Pressable>
    )
}