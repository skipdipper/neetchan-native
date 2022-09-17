import React from 'react';
import {
    StyleSheet,
    Text,
    Pressable,
} from 'react-native';

type ModalButtonProps = {
    title: string;
    onPress: () => void;
};

export default function ModalButton({ title, onPress }: ModalButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            android_ripple={{ color: '#dddddd' }}
            style={styles.button}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        paddingVertical: 10
    },
    text: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        // Fix bold text getting cut-off 
        fontFamily: 'Rubik-Regular',
        alignSelf: 'stretch',
        textAlign: 'center',
    }
});