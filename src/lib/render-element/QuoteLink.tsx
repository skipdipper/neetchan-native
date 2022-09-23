import React from 'react';
import {
    StyleSheet,
    Pressable,
    Text
} from 'react-native';
import ThreadModalView from '../../features/thread/ThreadModalView';
import { ModalHistorySyncContextInterface, useModalHistorySyncContext } from '../../features/ui/modal/ModalHistorySyncContext';
import { ModalVisibilityContextInterface, useModalVisibility } from '../../features/ui/modal/ModalVisibilityContext';


type QuoteLinkProps = {
    children: React.ReactNode,
    href: string,
};

export default function QuoteLink({ children, href }: QuoteLinkProps) {
    const { modalRef } = useModalVisibility() as ModalVisibilityContextInterface;
    const historyStack = useModalHistorySyncContext() as ModalHistorySyncContextInterface;

    const postId = parseInt(href.slice(2));

    const handlePress = () => {
        console.log(`Pressed on Quotelink ${href}`);

        historyStack.push(new Set([postId]));

        modalRef.current.registerChild(<ThreadModalView />);
        modalRef.current.openModal();
    }

    return (
        // TODO: Fix Pressable vertical alignment with Text
        <Pressable
            onPress={handlePress}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed
                        ? 'rgb(210, 230, 255)'
                        : 'transparent'
                },
            ]}>
            <Text style={styles.quotelink}>
                {children}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    quotelink: {
        color: 'orange',
        textDecorationLine: 'underline',
    },
});