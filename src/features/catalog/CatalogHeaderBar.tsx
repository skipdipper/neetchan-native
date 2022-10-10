import React, { useEffect, useState } from 'react';
import {
    BackHandler, StyleSheet, Text
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Board } from '../../shared/types';
import BoardListItem from '../board/BoardListItem';
import useBoard from '../board/useBoard';
import SearchButton from '../search/SearchButton';
import SearchHint from '../search/SearchHint';
import SearchInput from '../search/SearchInput';
import AppBar from '../ui/Appbar';
import DropdownButton from '../ui/dropdownmenu/DropdownButton';
import CatalogPopupMenuButton from './CatalogPopupMenuButton';


type CatalogHeaderBarProps = {
    setBoard?: (value: string) => void;
    board: string;
}

export default function CatalogHeaderBar({ board, setBoard }: CatalogHeaderBarProps) {
    const [searchbarVisible, setsearchbarVisible] = useState(false);
    const [boardList] = useBoard();

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [searchbarVisible]); // Re-bind back handler to prevent Stale closures

    const toggleSearchBarVisibility = () => setsearchbarVisible(prev => !prev);

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

    const renderItem = ({ item }: { item: Board }) => (
        <BoardListItem
            title={item.title}
            board={item.board}
        />
    );

    const boardItem = boardList?.find(item => item.board === board);

    const handleChange = (value: any) => {
        console.log('changed', value.board);
        setBoard?.(value.board);
    }

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
            title={
                boardItem
                    ? <DropdownButton
                        items={boardList}
                        value={boardItem}
                        menuItem={renderItem}
                        onChanged={handleChange}
                    />
                    : <Text style={styles.title}>Catalog</Text>
            }
            actions={[
                <SearchButton onPress={toggleSearchBarVisibility} />,
                refreshButton,
                <CatalogPopupMenuButton />
            ]}
        />
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        ontFamily: 'Rubik-Regular'
    }
});
