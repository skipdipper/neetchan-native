import { Pressable, StyleSheet, Text } from "react-native";


type PopupMenuItemProps = {
    child: React.ReactNode;
    action?: () => void;
};

export default function PopupMenuItem({ child, action }: PopupMenuItemProps) {

    const handlePress = () => {
        if (action) {
            action();
        }
    }


    return (
        <Pressable
            style={styles.container}
            onPress={handlePress}
            android_ripple={{ color: '#dddddd' }}
        >
            <Text style={styles.text}>{child}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        paddingVertical: 10,
    },
    text: {
        fontWeight: 'bold',
        textTransform: 'capitalize',
        // Fix bold text getting cut-off 
        fontFamily: 'Rubik-Regular',
        alignSelf: 'stretch',
        textAlign: 'left',
    }
});