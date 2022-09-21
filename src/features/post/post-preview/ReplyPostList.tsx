import React from 'react';
import {
    StyleSheet,
    View,
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
        <View>
            <FlatList
                data={Array.from(replies)}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                ItemSeparatorComponent={Separator}
            />
        </View>
    );
}