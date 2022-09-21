import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import { AppStatusBar } from '../features/ui';
import Thread from '../features/thread/Thread';
import Modal from '../features/ui/modal/Modal';
import { ModalVisibilityContextInterface, useModalVisibility } from '../features/ui/modal/ModalVisibilityContext';


type ThreadScreenProps = {
    navigation: any,
    route: any,
};

export default function ThreadScreen({ navigation, route }: ThreadScreenProps) {
    const { modalRef } = useModalVisibility() as ModalVisibilityContextInterface;

    return (
        <SafeAreaView style={styles.container}>
            <AppStatusBar />
            <Thread board={'a'} />
            {/* Single Modal instance per Screen  */}
            <Modal ref={modalRef} />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
});
