import React, { useRef } from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AppStatusBar } from '../features/ui';
import CatalogList from '../features/catalog/CatalogList';
import { SearchActiveContextInterface, useSearchActiveContext } from '../features/search/SearchActiveContext';
import SearchResult from '../features/search/SearchResult';
import CatalogListItem from '../features/catalog/CatalogListItem';
import { ScrollControllerContextInterface, useScrollControllerContext } from '../features/gallery/ScrollControllerContext';


type CatalogScreenProps = {
    navigation: any,
    route: any,
};

export default function CatalogScreen({ navigation, route }: CatalogScreenProps) {
    // TODO: React.Memo to prevent re-rendering from subscription to Context
    const { searchActive } = useSearchActiveContext() as SearchActiveContextInterface;
    const { scrollRef } = useScrollControllerContext() as ScrollControllerContextInterface;

    // TODO: reattach scrollRef after navigating back from ThreadScreen
    useFocusEffect(
        React.useCallback(() => {
            console.log('useFocusEffect ran for CatalogScreen');
            // console.log('scrollRef', scrollRef);
        }, [scrollRef.current])
    );


    console.log('CatalogScreen Render');
    const renderItem = ({ item }: { item: any }) => (
        <CatalogListItem item={item} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <AppStatusBar />
            {searchActive
                ? <SearchResult renderItem={renderItem} />
                : <CatalogList ref={scrollRef} board='a' />
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