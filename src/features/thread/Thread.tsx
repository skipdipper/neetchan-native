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
import Separator from '../ui/Separator';


const threadUrl = (board: string, no: number) => `https://a.4cdn.org/${board}/thread/${no}.json`;

type ThreadProps = {
    board: string,
};

export default function Thread({ board }: ThreadProps) {
    const route = useRoute<any>();

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
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
            setData(json.posts);
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
                    data={data}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 4,
    },
})