import React from 'react';
import {
    StyleSheet,
    View,
    FlatList,
} from 'react-native';
import { Separator } from '../ui';
import { OriginalPost } from '../../types/catalog';
import { useSearchContext, SearchContextInterface } from '../search/SearchContext';


type CatalogListProps = {
    renderItem: any,
};

export default function SearchResult({ renderItem }: CatalogListProps) {
    const { filteredData } = useSearchContext() as SearchContextInterface;
    const keyExtractor = (item: any) => String(item.postId);;

    console.log('SearchResult Render');
    return (
        <View style={styles.container}>
            {/* TODO: Add RefreshControl */}
            <FlatList
                data={filteredData}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                ItemSeparatorComponent={Separator}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 4,
    },
});

