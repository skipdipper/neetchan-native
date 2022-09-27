import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { PopupMenu } from ".";


type PopupMenuButtonProps = {
    icon: React.ReactNode;
    popupMenuEntry: React.ReactNode[];
};

export default function PopupMenuButton({ icon, popupMenuEntry }: PopupMenuButtonProps) {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const handlePress = () => {
        openMenu();
    }

    const openMenu = () => {
        setIsVisible(true);
    }

    const closeMenu = () => {
        setIsVisible(false);
    }


    return (
        <>
            <Pressable onPress={handlePress}>
                <View style={styles.icon}>{icon}</View>
            </Pressable>

            <PopupMenu
                isVisible={isVisible}
                closeMenu={closeMenu}
                popupMenuEntry={popupMenuEntry}
            />
        </>
    );
}

const styles = StyleSheet.create({
    icon: {
        flex: 1,
    }
});