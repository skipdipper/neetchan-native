import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import AppStatusBar from '../features/ui/AppStatusBar';
import CatalogList from '../features/catalog/CatalogList';


type CatalogScreenProps = {
    navigation: any,
    route: any,
};

export default function CatalogScreen({ navigation, route }: CatalogScreenProps) {
    return (
        <SafeAreaView style={styles.container}>
            <AppStatusBar />
            <CatalogList board='a' />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
})