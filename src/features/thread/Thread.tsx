import React, { useEffect, useState, useCallback } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    ListRenderItem,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { PostItem } from '../post';
import { Separator } from '../ui';
import { useThreadContext, ThreadContextInterface } from './ThreadContext';
import Repository from '../../data/repository/Repository';
import ThreadStats from './ThreadStats';


function Thread({ }, ref: React.Ref<FlatList>) {
    const route = useRoute<any>();

    const [isLoading, setLoading] = useState(true);

    // Type assert data, setData is not null
    const { data: thread, setData } = useThreadContext() as ThreadContextInterface;

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getThread();
        setRefreshing(false);

    }, []);

    const { board, threadId } = route.params;

    const getThread = async () => {
        try {
            const thread = await Repository.getThread(board, threadId);
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

    const data = Array.from(thread.values());

    const renderItem: ListRenderItem<any> = ({ item }) => (
        <PostItem item={item} catalog={false} />
    );


    const listFooterComponent = () => {
        const { replies, images, uniqueIps, archived } = data[0] || {};
        return (
            <ThreadStats
                replies={replies}
                images={images}
                uniqueIps={uniqueIps}
                page={0}
                archived={archived}
            />
        );
    }

    const keyExtractor = (item: any) => String(item.postId);;


    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    ref={ref}
                    data={data}
                    keyExtractor={keyExtractor}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    renderItem={renderItem}
                    ItemSeparatorComponent={Separator}
                    ListFooterComponent={listFooterComponent}
                    ListFooterComponentStyle={styles.listFooterComponentStyle}
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
    listFooterComponentStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24
    }
});