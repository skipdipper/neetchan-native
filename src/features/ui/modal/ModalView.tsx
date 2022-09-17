import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
} from 'react-native';


type ModalViewProps = {
    title?: string;
    actions: Array<React.ReactNode>;
    children: React.ReactNode;
};

export default function ModalView({ title, actions, children }: ModalViewProps) {
    return (
        <View style={styles.container}>
            {title &&
                <Text style={styles.title}>{title}</Text>
            }

            <View style={styles.actions}>
                {actions}
            </View>

            {/* TODO: Convert to Flatlist */}
            <ScrollView style={styles.content}>
                {children}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: 4,
        paddingVertical: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    actions: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    content: {
        width: '100%',
    }
});