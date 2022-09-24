import React, { useCallback, useState, useMemo } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Dimensions,
    useWindowDimensions,
    ViewabilityConfig,
    ViewToken,
    ViewabilityConfigCallbackPairs,
    Pressable,
} from 'react-native';
import GalleryImage from '../features/gallery/GalleryImage';
import GalleryVideo from '../features/gallery/GalleryVideo';
import { useCatalogContext } from '../features/catalog/CatalogContext';
import { useThreadContext } from '../features/thread/ThreadContext';
import { AppStatusBar } from '../features/ui';
import PageView from '../features/ui/PageView';
import GalleryHeaderBar from '../features/gallery/GalleryHeaderBar';
import { ScrollControllerContextInterface, useScrollControllerContext } from '../features/gallery/ScrollControllerContext';


const fileUrl = (board: string, tim: number, ext: string) => `https://i.4cdn.org/${board}/${tim}${ext}`;
const thumbnailUrl = (board: string, tim: number) => `https://i.4cdn.org/${board}/${tim}s.jpg`;

const getGalleryItems = (data: Map<number, any> | Array<any>) => {
    if (Array.isArray(data)) {
        return data.filter(item => item.hasOwnProperty('ext'));
    }
    const values = Array.from(data.values())
        .filter(item => item.hasOwnProperty('ext'));
    return values;
}

const getIndexOfGalleryItem = (data: Map<number, any> | Array<any>, tim: number) => {
    if (Array.isArray(data)) {
        return data.filter(item => item.hasOwnProperty('ext'))
            .findIndex(item => item.tim === tim);
    }

    const values = Array.from(data.values())
        .filter(item => item.hasOwnProperty('ext'))
        .findIndex(item => item.tim === tim);
    return values;
}

const getIndexOfFlatlistItem = (data: Map<number, any> | Array<any>, postId: number) => {
    if (Array.isArray(data)) return data.findIndex(item => item.no === postId);
    return Array.from(data.values()).findIndex(item => item.no === postId);
}

interface ViewableItems {
    viewableItems: Array<ViewToken>
    changed: Array<ViewToken>
}

type GalleryScreenProps = {
    navigation: any,
    route: any,
};

export default function GalleryScreen({ navigation, route }: GalleryScreenProps) {
    const { scrollRef } = useScrollControllerContext() as ScrollControllerContextInterface;

    const { tim, catalog } = route.params;
    // Get screen width for setting PageView item width
    const { width } = useWindowDimensions();
    // TODO: Fix displaying incorrect item when screen rotates 
    // TODO: Fix App crashing when playing videos

    // Context maybe null if using default value
    const threadData = useThreadContext();
    const catalogData = useCatalogContext();
    const data = catalog ? catalogData!.data : threadData!.data;

    const galleryItems = getGalleryItems(data);
    const initialScrollIndex = getIndexOfGalleryItem(data, tim);

    const getItemLayout = useCallback((data: any[] | null | undefined, index: number) => (
        { length: width, offset: width * index, index: index }
    ), [width]);

    const keyExtractor = useCallback((item: any) => String(item.no), []);

    const scrollToIndex = (index: number) => {
        console.log('Scrolling to index', index);
        scrollRef?.current?.scrollToIndex({ animated: true, index: index, viewPosition: 0 });
        if (!scrollRef.current) {
            console.log('Not scrolling because scroll ref is null');
        }
    }

    const pageViewabilityConfig: ViewabilityConfig = useMemo(() => ({
        itemVisiblePercentThreshold: 50,
    }), []);

    const onPageChanged = useCallback(({ viewableItems, changed }: ViewableItems) => {
        const viewableItem = viewableItems.find(viewtoken => viewtoken.isViewable);
        const pageIndex = viewableItem?.index ?? -1;
        // TODO fix potentially undefined
        const { filename, ext, no } = viewableItem?.item;
        navigation.setOptions({
            headerTitle: () => <GalleryHeaderBar filename={filename} extension={ext} pageIndex={pageIndex + 1} />
        });

        // Not necessary to scroll to index on initial Flatlist render
        if (pageIndex !== initialScrollIndex) {
            // Only for CatalogList
            // scrollToIndex(pageIndex);

            const flatlistItemIndex = getIndexOfFlatlistItem(data, no);
            scrollToIndex(flatlistItemIndex);
        }
    }, []);

    // TODO: Fix Changing viewabilityConfigCallbackPairs on the fly is not supported
    const viewabilityConfigCallbackPairs: ViewabilityConfigCallbackPairs = useMemo(() => ([
        { viewabilityConfig: pageViewabilityConfig, onViewableItemsChanged: onPageChanged }
    ]), []);

    const handlePress = useCallback(() => {
        navigation.goBack();
    }, []);

    // TODO: extract to Constants file
    const videoFormat = ['.webm', '.mp4', 'm4v', 'mpg', 'avi'];

    const renderItem = ({ item }: any) => (
        <Pressable onPress={handlePress}>
            <View style={[styles.item, { width: width }]}>
                {videoFormat.includes(item.ext)
                    ? <GalleryVideo uri={fileUrl('a', item.tim, item.ext)} poster={thumbnailUrl('a', item.tim)} />
                    : <GalleryImage uri={fileUrl('a', item.tim, item.ext)} />
                }
            </View>
        </Pressable>
    );

    return (
        <SafeAreaView style={styles.container}>
            <AppStatusBar />
            <PageView
                data={galleryItems}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                getItemLayout={getItemLayout}
                initialScrollIndex={initialScrollIndex}
                customViewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(54, 54, 54, 0.9)'
    },

    item: {
        // width: Dimensions.get('window').width,
        // Position activity indicator
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
    },
});