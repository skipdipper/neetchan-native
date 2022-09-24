import React, { useEffect, useState, useCallback } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { PostItem } from '../post';
import { Separator } from '../ui';
import { useThreadContext, ThreadContextInterface } from './ThreadContext';
import { getQuoteIds } from '../../lib/getQuoteIds';


const threadUrl = (board: string, no: number) => `https://a.4cdn.org/${board}/thread/${no}.json`;

type ThreadProps = {
    board: string,
};

function Thread({ board }: ThreadProps, ref: React.Ref<FlatList>) {
    const route = useRoute<any>();

    const [isLoading, setLoading] = useState(true);

    // Type assert data, setData is not null
    const { data, setData } = useThreadContext() as ThreadContextInterface;

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getThread();
        setRefreshing(false);

    }, []);

    const { no: threadId } = route.params;

    const getThread = async () => {
        try {
            const response = await fetch(threadUrl(board, threadId));
            const json = await response.json();

            const thread = new Map<number, any>(
                json.posts.map((post: any) => {
                    //  TODO: add prop replies: Set<postId>
                    return [post.no, { ...post }];
                })
            );

            // Populate Post Reply Ids for each post
            json.posts.forEach((post: any) => {
                const comment: string | undefined = post.com;
                if (!comment) return;

                const postIds = getQuoteIds(comment);
                postIds.forEach(postId => {
                    if (!thread.has(postId)) return;

                    if (thread.get(postId).postReplies) {
                        thread.get(postId).postReplies.add(post.no);
                    } else {
                        thread.get(postId).postReplies = new Set([post.no]);
                    }
                });
            });

            setData(thread);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getThread();
    }, []);


    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    ref={ref}
                    data={Array.from(data.values())}
                    keyExtractor={(item: any) => item.no}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    renderItem={({ item }) => (
                        <PostItem item={item} catalog={false} />
                    )}
                    ItemSeparatorComponent={Separator}
                />
            )}
        </View>
    )
}
export default React.forwardRef(Thread);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 4,
    },
})