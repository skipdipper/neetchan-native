import React, { Fragment, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
} from 'react-native';
import { PostItem } from '../../features/post';
import { useThreadContext, ThreadContextInterface } from '../../features/thread/ThreadContext';
import ModalContainer from '../../features/ui/modal/ModalContainer';


type QuoteLinkProps = {
    children: React.ReactNode,
    href: string,
};

export default function QuoteLink({ children, href }: QuoteLinkProps) {
    // Type assert data, setData is not null
    const { data: thread } = useThreadContext() as ThreadContextInterface;
    const [modalVisible, setModalVisible] = useState(false);
    const postId = parseInt(href.slice(2));

    const handlePress = () => {
        console.log(`Pressed on Quotelink ${href}`);
        setModalVisible(true);
    }

    const toggleModal = () => {
        setModalVisible(visible => !visible);
    }

    return (
        // TODO: Fix Pressable vertical alignment with Text
        <Fragment>
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

            <ModalContainer isVisible={modalVisible} handleClose={toggleModal}>
                <PostItem item={thread.get(postId)} catalog={false} />
            </ModalContainer>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    quotelink: {
        color: 'orange',
        textDecorationLine: 'underline',
    },
});