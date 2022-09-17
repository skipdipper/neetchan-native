import React from 'react';
import {
    Modal,
} from 'react-native';
import { Center, Separator } from '../../ui';
import ModalView from './ModalView';
import ModalButton from './ModalButton';


type ModalContainerProps = {
    children: React.ReactNode;
    isVisible?: boolean | undefined;
    handleClose: () => void;
};

export default function ModalContainer({ children, isVisible, handleClose }: ModalContainerProps) {
    return (
        // TODO: Close previous Modal when opening new Modal to avoid exceeding 
        // Maximum call stack size and backgroundColor stacking
        <Center>
            <Modal
                animationType='fade'
                transparent={true}
                visible={isVisible}
                onRequestClose={handleClose}
            >
                <Center style={{ backgroundColor: 'rgba(54, 54, 54, 0.6)' }}>
                    <ModalView
                        // TODO: Extract tightly coupled action components 
                        actions={[
                            <ModalButton key={1} title='back' onPress={handleClose} />,
                            <Separator key={2} direction='vertical' />,
                            // TODO: Close all Modals
                            <ModalButton key={3} title='close' onPress={handleClose} />
                        ]}
                    >
                        {children}
                    </ModalView>
                </Center>
            </Modal >
        </Center>
    )
}