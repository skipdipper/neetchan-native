import React, { useCallback, useState, useMemo, useRef, MutableRefObject, useEffect } from 'react';
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
import GalleryImage from '../features/media-viewer/GalleryImage';
import GalleryVideo from '../features/media-viewer/GalleryVideo';
import { useCatalogContext } from '../features/catalog/CatalogContext';
import { useThreadContext } from '../features/thread/ThreadContext';
import { AppStatusBar } from '../features/ui';
import PageView from '../features/ui/PageView';
import GalleryHeaderBar from '../features/media-viewer/GalleryHeaderBar';
import { ScrollControllerContextInterface, useScrollControllerContext } from '../features/media-viewer/ScrollControllerContext';


const getGalleryItems = (data: Map<number, any> | Array<any>) => {
    if (Array.isArray(data)) {
        return data.filter(item => item.hasOwnProperty('fileExtension'));
    }
    const values = Array.from(data.values())
        .filter(item => item.hasOwnProperty('fileExtension'));
    return values;
}

const getIndexOfGalleryItem = (data: Map<number, any> | Array<any>, tim: number) => {
    if (Array.isArray(data)) {
        return data.filter(item => item.hasOwnProperty('fileExtension'))
            .findIndex(item => item.tim === tim);
    }

    const values = Array.from(data.values())
        .filter(item => item.hasOwnProperty('fileExtension'))
        .findIndex(item => item.tim === tim);
    return values;
}

const getIndexOfFlatlistItem = (data: Map<number, any> | Array<any>, postId: number) => {
    if (Array.isArray(data)) return data.findIndex(item => item.postId === postId);
    return Array.from(data.values()).findIndex(item => item.postId === postId);
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

    // Ref object of key: video postId to value: GalleryVideo ref
    const videoItemRefs: MutableRefObject<any> = useRef({});


    // Context maybe null if using default value
    const threadData = useThreadContext();
    const catalogData = useCatalogContext();
    const data = catalog ? catalogData!.data : threadData!.data;

    const galleryItems = getGalleryItems(data);
    const initialScrollIndex = getIndexOfGalleryItem(data, tim);

    const getItemLayout = useCallback((data: any[] | null | undefined, index: number) => (
        { length: width, offset: width * index, index: index }
    ), [width]);

    useEffect(() => {
        navigation.setParams({
            images: galleryItems.length,
        });
    }, [navigation]);

    // const keyExtractor = useCallback((item: any) => String(item.postId), []);
    const keyExtractor = useCallback((item: any) => String(item.postId), []);


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
        const { filename, fileExtension, postId } = viewableItem?.item;
        navigation.setOptions({
            headerTitle: () => <GalleryHeaderBar filename={filename} fileExtension={fileExtension} pageIndex={pageIndex + 1} />
        });

        // Not necessary to scroll to index on initial Flatlist render
        if (pageIndex !== initialScrollIndex) {
            // Only for CatalogList
            // scrollToIndex(pageIndex);

            const flatlistItemIndex = getIndexOfFlatlistItem(data, postId);
            scrollToIndex(flatlistItemIndex);
        }
    }, []);

    const videoItemViewabilityConfig: ViewabilityConfig = useMemo(() => ({
        itemVisiblePercentThreshold: 80, // 100 does not register
    }), []);

    const onVideoItemChanged = useCallback(({ changed }: ViewableItems) => {
        // Filter for changed items that are GalleryVideos
        const changedVideoItems = changed.filter(viewtoken => videoFormat.includes(viewtoken.item?.fileExtension));
        // console.log('changedVideoItems:', changedVideoItems);

        if (!changedVideoItems.length) return;
        // console.log('videoItemRefs:', videoItemRefs);


        changedVideoItems.forEach((viewtoken: ViewToken) => {
            // key is derived from key extracted so same as postId (item.postId)
            const cell = videoItemRefs.current[viewtoken.key];

            if (cell) { // not undefined
                if (viewtoken.isViewable) {
                    cell.play(); // video may not play if still buffering
                } else {
                    cell.stop();
                }
            }
        })
    }, []);

    // TODO: Fix Changing viewabilityConfigCallbackPairs on the fly is not supported
    const viewabilityConfigCallbackPairs: ViewabilityConfigCallbackPairs = useMemo(() => ([
        { viewabilityConfig: pageViewabilityConfig, onViewableItemsChanged: onPageChanged },
        { viewabilityConfig: videoItemViewabilityConfig, onViewableItemsChanged: onVideoItemChanged }
    ]), []);

    const handlePress = useCallback(() => {
        // navigation.goBack();
    }, []);


    // Alternative to inline callback ref but requires passing postId to GalleryVideo
    // for videoItemRefs to use as key 
    // ref = {(videoItemRef) => {
    //     console.log('VIDEO ITEM REF:', videoItemRef);
    //     videoItemRefs.current[item.postId] = videoItemRef;
    // }}
    const videoItemHandle = useCallback((videoItemHandle: any) => {
        if (videoItemHandle === null) { // ref component unmounted
            // TODO: delete property from videoItemRefs
            // delete videoItemRefs.current[videoItemHandle!.postId];
        } else if (videoItemHandle !== null) { // ref component mounted
            videoItemRefs.current[videoItemHandle!.postId] = videoItemHandle;
        }
    }, []);


    // TODO: extract to Constants file
    const videoFormat = ['.webm', '.mp4', 'm4v', 'mpg', 'avi'];

    const renderItem = ({ item }: any) => {
        return (
            <Pressable onPress={handlePress}>
                <View style={[styles.item, { width: width }]}>
                    {videoFormat.includes(item.fileExtension)
                        ? <GalleryVideo ref={videoItemHandle} postId={item.postId} uri={item.fileUrl} poster={item.thumbnailUrl} />
                        : <GalleryImage uri={item.fileUrl} />
                    }
                </View>
            </Pressable>
        );
    };


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