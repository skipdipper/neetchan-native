import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
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
            <Pressable
                onPress={handlePress}
                android_ripple={{ color: '#dddddd' }}
            >
                <View style={styles.icon}>{icon}</View>
            </Pressable>

            {/* <Icon.Button
                name="more-vert"
                size={30}
                color="#333"
                borderRadius={0}
                backgroundColor='transparent'
                underlayColor='#ddd'
                iconStyle={{ marginRight: 0 }}
                onPress={handlePress}
            /> */}

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