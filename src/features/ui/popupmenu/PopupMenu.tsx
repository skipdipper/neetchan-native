import React from "react";
import { Animated, Modal, ScrollView, StyleSheet, View } from "react-native";


type PopupMenuProps = {
    isVisible: boolean;
    popupMenuEntry: React.ReactNode[];
    closeMenu: () => void;
};

export default function PopupMenu({ isVisible, closeMenu, popupMenuEntry }: PopupMenuProps) {

    const handleBackdrop = () => {
        closeMenu();
    };

    return (
        <Modal transparent={true} visible={isVisible}>
            <Animated.View
                style={styles.backdrop}
                onTouchEnd={handleBackdrop}
            >
            </Animated.View>

            <View style={styles.container}
                onStartShouldSetResponder={() => true}
                onTouchEnd={closeMenu} // TODO: onPress instead to handle touch cancel
            >
                <ScrollView // TODO: Fix not scrolling
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                >
                    {popupMenuEntry.map((entry, index) => (
                        <React.Fragment key={index}>
                            {entry}
                        </React.Fragment>
                    ))}
                </ScrollView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(54, 54, 54, 0.6)',
    },
    container: {
        position: 'absolute',
        right: 0,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
    },
});