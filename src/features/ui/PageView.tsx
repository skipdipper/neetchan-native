import React, { useCallback, useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    FlatList,
    ViewToken,
    ViewabilityConfig,
    ViewabilityConfigCallbackPair
} from 'react-native';


/*
See example of single ViewToken object from https://reactnative.dev/docs/viewtoken
*/
interface ViewableItems {
    viewableItems: Array<ViewToken>
    changed: Array<ViewToken>
}

type PagerViewProps = {
    data: any[];
    renderItem: any;
    getItemLayout?: (data: any[] | null | undefined, index: number) => { length: number, offset: number, index: number }
    initialScrollIndex?: number;
};

export default function PageView({ data, renderItem, getItemLayout, initialScrollIndex }: PagerViewProps) {
    // TODO: Wrap getItemLayout in useCallBack
    // TODO: Unmount video player onPageChange
    // TOD: Fix Image displaying Video controls
    const onViewableItemsChanged = useCallback(({ viewableItems, changed }: ViewableItems) => {
        // console.log('Viewable Items:', viewableItems);
        // console.log('Viewable Items Changed:', changed);
    }, []);

    const viewabilityConfig: ViewabilityConfig = {
        minimumViewTime: 500,
        itemVisiblePercentThreshold: 50,
    };

    // https://github.com/facebook/react-native/issues/30171
    const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }])

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                disableIntervalMomentum={true}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => String(index)}
                getItemLayout={getItemLayout}
                initialScrollIndex={initialScrollIndex}
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});