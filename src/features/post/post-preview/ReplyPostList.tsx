import React from 'react';
import {
    StyleSheet,
    FlatList
} from 'react-native';
import { PostItem } from '..';
import { ThreadContextInterface, useThreadContext } from '../../thread/ThreadContext';
import { Separator } from '../../ui';


type ReplyPostListProps = {
    replies: Set<number>;
};

export default function ReplyPostList({ replies }: ReplyPostListProps) {
    const { data: thread } = useThreadContext() as ThreadContextInterface;

    const renderItem = ({ item }: { item: number }) => (
        <PostItem item={thread.get(item)} catalog={false} />
    );

    const keyExtractor = (item: number) => String(item);


    return (
        <FlatList
            contentContainerStyle={styles.container}
            data={Array.from(replies)}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            ItemSeparatorComponent={Separator}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center'
    },
});