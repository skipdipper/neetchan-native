import React from 'react';
import {
    StyleSheet,
    Text,
} from 'react-native';
import PressableHighlight from '../../features/ui/PressableHighlight';


type ThreadLinkProps = {
    children: React.ReactNode,
    href: string,
};

export default function ThreadLink({ children, href }: ThreadLinkProps) {
    const handlePress = () => {
        // TODO: navigate to linked Thread screen
        console.log(`Pressed on Threadlink ${href}`);
    }

    return (
        <PressableHighlight onPress={handlePress}>
            <Text style={styles.threadlink}>
                {children} {"\u2192"}
            </Text>
        </PressableHighlight>
    );
}

const styles = StyleSheet.create({
    threadlink: {
        color: 'orange',
        textDecorationLine: 'underline',
    },
});