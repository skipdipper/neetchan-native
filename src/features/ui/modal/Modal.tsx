import React, { useCallback, useImperativeHandle, useState } from 'react';
import {
    StyleSheet,
    Animated,
    Modal as ReactModal
} from 'react-native';

type ModalProps = {
    children: React.ReactNode;
};

/*
Single Modal accessed Imperatively using custom exposed Ref hook methods 
Modal Context is set by using registerChild
Inspired by: https://github.com/Benjamiiiin/rn-reusable-modal
*/
function Modal({ }, ref: React.Ref<any>) {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [child, setChild] = useState<React.ReactNode>(null);
    // TODO: Add Modal History Stack

    const registerChild = useCallback((child: React.ReactNode) => {
        setChild(child);
    }, []);

    const openModal = useCallback(() => {
        setIsVisible(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsVisible(false);
    }, []);

    const closeAllModals = useCallback(() => {
        setIsVisible(false);
    }, []);

    // Public methods exposed by Ref
    useImperativeHandle(ref, () => {
        return {
            registerChild,
            openModal,
            closeModal,
            closeAllModals
        }
    }, []);


    if (!isVisible) return null;

    return (
        /* 
        React Modal component is required to display overlay above Navigator Header Bar 
        because absolute positioned children cannot overlay ancestor even with zIndex
        */
        <ReactModal transparent={true} visible={true} animationType='none'>
            {/* MODAL BACKDROP */}
            <Animated.View
                style={styles.backdrop}
                onTouchEnd={closeModal}
            >
            </Animated.View>

            {/* MODAL CONTAINER */}
            <Animated.View
                style={styles.container}
                pointerEvents='box-none'
            >
                {child}
            </Animated.View>
        </ReactModal>
    );
}

export default React.forwardRef(Modal);

const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(54, 54, 54, 0.6)',
    },
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        // alignItems: 'center',
    }
});