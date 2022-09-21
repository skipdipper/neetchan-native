import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
} from 'react-native';
import ThreadModalView from '../../thread/ThreadModalView';
import { useModalVisibility, ModalVisibilityContextInterface } from '../../ui/modal/ModalVisibilityContext';


type SubjectProps = {
    replies: Set<number>;
};

export default function Replies({ replies }: SubjectProps) {
    const { modalRef } = useModalVisibility() as ModalVisibilityContextInterface;

    const handlePress = () => {
        console.log('Pressed on Repies');

        modalRef.current.registerChild(
            <ThreadModalView replies={replies} />
        );
        modalRef.current.openModal();
    }

    return (
        <Pressable
            onPress={handlePress}
            android_ripple={{ color: '#dddddd' }}
            style={styles.button}
        >
            <Text>{replies.size} {replies.size == 1 ? `reply` : `replies`}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        // padding: 8,
        paddingTop: 8,
    },
});
