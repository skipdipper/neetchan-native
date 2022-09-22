import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { Separator } from '../ui';
import ModalButton from '../ui/modal/ModalButton';
import { ModalVisibilityContextInterface, useModalVisibility } from '../ui/modal/ModalVisibilityContext';
import ReplyPostList from '../post/post-preview/ReplyPostList';
import { useModalHistorySyncContext, ModalHistorySyncContextInterface } from '../ui/modal/ModalHistorySyncContext';


export default function ThreadModalView() {
    const { modalRef } = useModalVisibility() as ModalVisibilityContextInterface;
    const historyStack = useModalHistorySyncContext() as ModalHistorySyncContextInterface;


    return (
        <View style={styles.container}>
            <View style={styles.actions}>
                <ModalButton title='back' onPress={() => {
                    historyStack.pop();
                    if (!historyStack.isEmpty()) {
                        modalRef.current.registerChild(
                            <ThreadModalView />
                        );
                    } else {
                        // console.log('Current Stack Size:', historyStack.size());
                        modalRef.current.closeModal();
                    }
                }}
                />
                <Separator direction='vertical' />
                <ModalButton title='close' onPress={() => {
                    historyStack.clear();
                    modalRef.current.closeAllModals();
                }}
                />
            </View>
            <ReplyPostList />
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