import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
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

    const drawerButton = <Icon name='menu' size={24} color='#333' />;
    const refreshButton = <Icon name='refresh' size={24} color='#333' />;

    const title = searchbarVisible
        ? <SearchInput />
        : <Text style={{ fontSize: 20, fontFamily: 'Rubik-Regular' }}>Catalog</Text>;

    const bottom = searchbarVisible ? <SearchHint /> : <></>;


    return (
        <AppBar
            leading={drawerButton}
            title={title}
            actions={[
                <SearchButton onPress={toggleSearchBarVisibility} />,
                refreshButton,
                <CatalogPopupMenuButton />
            ]}
            bottom={bottom}
        />
    );
}

