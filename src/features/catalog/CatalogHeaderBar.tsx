import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    BackHandler,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchButton from '../search/SearchButton';
import SearchHint from '../search/SearchHint';
import SearchInput from '../search/SearchInput';
import AppBar from '../ui/Appbar';
import CatalogPopupMenuButton from './CatalogPopupMenuButton';


export default function CatalogHeaderBar() {
    const [searchbarVisible, setsearchbarVisible] = useState(false);

    const toggleSearchBarVisibility = () => setsearchbarVisible(prev => !prev);

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [searchbarVisible]); // Re-bind back handler to prevent Stale closures

    const backAction = () => {
        if (searchbarVisible) {
            toggleSearchBarVisibility();
            // TODO: invoke SearchInput handleCancel via ref
            return true;
        }

        return false;
    };

    const drawerButton = <Icon name='menu' size={24} color='#333' />;
    const refreshButton = <Icon name='refresh' size={24} color='#333' />;

    const title = <Text style={{ fontSize: 20, fontFamily: 'Rubik-Regular' }}>Catalog</Text>;

    if (searchbarVisible) {
        return (
            <AppBar
                title={<SearchInput onCancel={toggleSearchBarVisibility} />}
                titleStyle={{ marginLeft: 0 }}
                bottom={<SearchHint />}
            />
        );
    }

    return (
        <AppBar
            leading={drawerButton}
            title={title}
            actions={[
                <SearchButton onPress={toggleSearchBarVisibility} />,
                refreshButton,
                <CatalogPopupMenuButton />
            ]}
        />
    );
}

