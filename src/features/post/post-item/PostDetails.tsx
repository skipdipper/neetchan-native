import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';


type PostDetailsProps = {
    name: string,
    postID: number,
    now: number,
    time: number,
};

// Thread id and time posted 
export default function PostDetails({ name, postID, now, time }: PostDetailsProps) {
    return (
        <View style={styles.container}>
            <Text style={{ marginRight: 1, fontSize: 12 }}>{name}</Text>
            <Text style={{ marginRight: 1, fontSize: 12 }}>No. {postID}</Text>
            <Text style={{ flexShrink: 1, fontSize: 12 }}>{now}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'row',
    }
});