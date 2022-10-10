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
import Repository from '../../data/repository/Repository';


function Thread({ }, ref: React.Ref<FlatList>) {
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


    const keyExtractor = (item: any) => String(item.postId);;


    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    ref={ref}
                    data={Array.from(data.values())}
                    keyExtractor={keyExtractor}
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