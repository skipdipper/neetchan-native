import React, { useEffect, useState, useCallback } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { Separator } from '../ui';
import { CatalogPage, OriginalPost } from '../../types/catalog';
import { CatalogContextInterface, useCatalogContext } from './CatalogContext';
import CatalogListItem from './CatalogListItem';
import Repository from '../../data/repository/Repository';


type CatalogListProps = {
    board: string,
};

function CatalogList({ board }: CatalogListProps, ref: React.Ref<FlatList>) {
    const [isLoading, setLoading] = useState(true);
    const { data, setData } = useCatalogContext() as CatalogContextInterface;
    const [refreshing, setRefreshing] = useState(false);

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

    const renderItem = ({ item }: { item: OriginalPost }) => (
        <CatalogListItem item={item} />
    );

    const keyExtractor = (item: OriginalPost) => String(item.no);


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

