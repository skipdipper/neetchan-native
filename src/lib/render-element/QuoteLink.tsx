import React from 'react';
import {
    StyleSheet,
    Text
} from 'react-native';
import ThreadModalView from '../../features/thread/ThreadModalView';
import { ModalHistorySyncContextInterface, useModalHistorySyncContext } from '../../features/ui/modal/ModalHistorySyncContext';
import { ModalVisibilityContextInterface, useModalVisibility } from '../../features/ui/modal/ModalVisibilityContext';
import PressableHighlight from '../../features/ui/PressableHighlight';


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
        <PressableHighlight onPress={handlePress}>
            <Text style={styles.quotelink}>
                {children}
            </Text>
        </PressableHighlight>
    );
}

const styles = StyleSheet.create({
    quotelink: {
        color: 'orange',
        textDecorationLine: 'underline',
    },
});