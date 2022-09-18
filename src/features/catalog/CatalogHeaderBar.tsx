import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import SearchInput from '../search/SearchInput';


export default function CatalogHeaderBar() {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                {/* TODO: Add Board Dropdown Menu and Search Icon */}
                <SearchInput />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
    },
})


