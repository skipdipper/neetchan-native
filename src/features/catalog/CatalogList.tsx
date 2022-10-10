import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator, FlatList, RefreshControl, StyleSheet,
    View
} from 'react-native';
import Repository from '../../data/repository/Repository';
import { CatalogPost } from '../../shared/types';
import { Separator } from '../ui';
import { CatalogContextInterface, useCatalogContext } from './CatalogContext';
import CatalogListItem from './CatalogListItem';


type CatalogListProps = {
    board: string,
};

function CatalogList({ board }: CatalogListProps, ref: React.Ref<FlatList>) {
    const [isLoading, setLoading] = useState(true);
    const { data, setData } = useCatalogContext() as CatalogContextInterface;
    const [refreshing, setRefreshing] = useState(false);
    const initRender = useRef(true);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getCatalog();
        setRefreshing(false);
        console.log('useCallBack for CatalogList ran');
    }, []);
    console.log('CatalogList Render');

    const getCatalog = async () => {
        console.log('Fetching Catalog from API');
        try {
            setLoading(true);
            const threads = await Repository.getCatalog(board);
            setData(threads);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        console.log('useEffect for CatalogList ran');
        // console.log('Number of OPs:', data.length);

        // Use stale Data after canceling Search Filtering 
        if (data?.length) {
            // console.log('NOT fetching Catalog from API');
            setLoading(false);
            return;
        }
        getCatalog();
    }, []);

    // Refetch Catalog when board changes, does not run onMount
    // TODO: Use custom hook for storing previous value of board
    useEffect(() => {
        if (initRender.current) {
            initRender.current = false;
            return;
        }

        getCatalog();
    }, [board]);

    const renderItem = ({ item }: { item: CatalogPost }) => (
        <CatalogListItem item={item} />
    );

    const keyExtractor = (item: CatalogPost) => String(item.postId);


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
                />
            )}
        </View>
    )
}

export default React.forwardRef(CatalogList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 4,
    },
});

