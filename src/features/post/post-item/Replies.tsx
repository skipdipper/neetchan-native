import React, { Fragment, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable
} from 'react-native';
import { PostItem } from '.';
import { ThreadContextInterface, useThreadContext } from '../../thread/ThreadContext';
import { Separator } from '../../ui';
import ModalContainer from '../../ui/modal/ModalContainer';


type SubjectProps = {
    replies: Set<number>;
};

export default function Replies({ replies }: SubjectProps) {
    // Type assert data, setData is not null
    const { data: thread } = useThreadContext() as ThreadContextInterface;
    const [modalVisible, setModalVisible] = useState(false);

    const handlePress = () => {
        console.log('Pressed on Repies');
        setModalVisible(true);
    }

    const toggleModal = () => {
        setModalVisible(visible => !visible);
    }

    return (
        <Fragment>
            <Pressable
                onPress={handlePress}
                android_ripple={{ color: '#dddddd' }}
                style={styles.button}
            >
                <Text>{replies.size} {replies.size == 1 ? `reply` : `replies`}</Text>
            </Pressable>

            {/* View Wrapper required for Spacer to properly space Replies to flex-end */}
            <View>
                <ModalContainer isVisible={modalVisible} handleClose={toggleModal}>
                    {
                        Array.from(replies).map((postId, index) => {
                            return (
                                <Fragment key={postId}>
                                    <PostItem item={thread.get(postId)} catalog={false} />
                                    {index < replies.size - 1 &&
                                        <Separator />
                                    }
                                </Fragment>
                            )
                        })
                    }
                </ModalContainer>
            </View>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    button: {
        // padding: 8,
        paddingTop: 8,
    },
});