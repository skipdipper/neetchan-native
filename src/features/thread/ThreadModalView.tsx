import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { Separator } from '../ui';
import ModalButton from '../ui/modal/ModalButton';
import { ModalVisibilityContextInterface, useModalVisibility } from '../ui/modal/ModalVisibilityContext';
import ReplyPostList from '../post/post-preview/ReplyPostList';


type ThreadModalViewProps = {
    replies: Set<number>;
};

export default function ThreadModalView({ replies }: ThreadModalViewProps) {
    const { modalRef } = useModalVisibility() as ModalVisibilityContextInterface;

    return (
        <View style={styles.container}>
            <View style={styles.actions}>
                <ModalButton title='back' onPress={modalRef.current.closeModal} />
                <Separator direction='vertical' />
                <ModalButton title='close' onPress={modalRef.current.closeAllModals} />
            </View>
            <ReplyPostList replies={replies} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexShrink: 1,
        width: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: 4,
        paddingVertical: 4,
    },
    actions: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }
});