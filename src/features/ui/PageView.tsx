import React, { useCallback, useRef, useMemo } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    FlatList,
    ViewToken,
    ViewabilityConfig,
    ViewabilityConfigCallbackPairs,
} from 'react-native';


/*
    See example of single ViewToken object from https://reactnative.dev/docs/viewtoken
*/
interface ViewableItems {
    viewableItems: Array<ViewToken>
    changed: Array<ViewToken>
}

type PageViewProps = {
    data: any[];
    renderItem: any;
    getItemLayout?: (data: any[] | null | undefined, index: number) => (
        { length: number, offset: number, index: number }
    );
    initialScrollIndex?: number;
    keyExtractor?: (item: any, index: number) => string;
    customViewabilityConfigCallbackPairs: ViewabilityConfigCallbackPairs;

};

export default function PageView({
    data,
    renderItem,
    keyExtractor,
    getItemLayout,
    initialScrollIndex,
    customViewabilityConfigCallbackPairs = [],
}: PageViewProps) {
    // TODO: Unmount video player onPageChange
    // TOD: Fix Image displaying Video controls
    const onViewableItemsChanged = useCallback(({ viewableItems, changed }: ViewableItems) => {
        // console.log('Viewable Items:', viewableItems);
        // console.log('Viewable Items Changed:', changed);
    }, []);

    const viewabilityConfig: ViewabilityConfig = useMemo(() => ({
        // minimumViewTime: 500,
        itemVisiblePercentThreshold: 50,
    }), []);

    // TODO: Fix Changing viewabilityConfigCallbackPairs on the fly is not supported
    //       on Hot reload due to state change
    const viewabilityConfigCallbackPairs: ViewabilityConfigCallbackPairs = useMemo(() => ([
        { viewabilityConfig, onViewableItemsChanged },
        ...customViewabilityConfigCallbackPairs
    ]), []);


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                disableIntervalMomentum={true}
                data={data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                getItemLayout={getItemLayout}
                initialScrollIndex={initialScrollIndex}
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs}
                // TODO: customizable FlatListProps instead 
                windowSize={3}
                initialNumToRender={3}
                maxToRenderPerBatch={2}
                updateCellsBatchingPeriod={50}
                removeClippedSubviews={true}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});