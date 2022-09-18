import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import { AppStatusBar } from '../features/ui';
import CatalogList from '../features/catalog/CatalogList';
import { SearchActiveContextInterface, useSearchActiveContext } from '../features/search/SearchActiveContext';
import SearchResult from '../features/search/SearchResult';
import CatalogListItem from '../features/catalog/CatalogListItem';


type CatalogScreenProps = {
    navigation: any,
    route: any,
};

export default function CatalogScreen({ navigation, route }: CatalogScreenProps) {
    // TODO: React.Memo to prevent re-rendering from subscription to Context
    const { searchActive } = useSearchActiveContext() as SearchActiveContextInterface;
    console.log('CatalogScreen Render');
    const renderItem = ({ item }: { item: any }) => (
        <CatalogListItem item={item} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <AppStatusBar />
            {searchActive
                ? <SearchResult renderItem={renderItem} />
                : <CatalogList board='a' />
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
});