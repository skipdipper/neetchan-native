import React from 'react';
import {
    StyleSheet,
    Text,
    Pressable,
} from 'react-native';


type CrossLinkProps = {
    children: React.ReactNode,
    href: string,
};

export default function CrossLink({ children, href }: CrossLinkProps) {
    const handleOnPress = () => {
        // TODO: navigate to linked Thread screen
        console.log(`Pressed on Crosslink ${href}`);
    }

    return (
        <Pressable onPress={handleOnPress}>
            <Text style={styles.crosslink} >
                {children}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    crosslink: {
        color: 'orange',
        textDecorationLine: 'underline',
    },
})