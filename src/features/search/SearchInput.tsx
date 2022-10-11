import React, { useRef } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { useCatalogContext, CatalogContextInterface } from '../catalog/CatalogContext';
import { SearchContextInterface, useSearchContext } from './SearchContext';
import { SearchActiveContextInterface, useSearchActiveContext } from './SearchActiveContext';
import IconButton from '../ui/IconButton';

type SearchInputProps = {
    onCancel?: () => void;
    onClear?: () => void;
};

export default function SearchInput({ onCancel, onClear }: SearchInputProps) {
    const { data } = useCatalogContext() as CatalogContextInterface;
    const { searchText, setSearchText, filteredData, setFilteredData } = useSearchContext() as SearchContextInterface;
    const { setSearchActive } = useSearchActiveContext() as SearchActiveContextInterface;

    const searchInputRef = useRef<TextInput>(null);

    const handleChangeText = (changedText: string) => {
        setSearchText(changedText);

        if (!changedText) {
            console.log('Search input empty');
            setSearchActive(false);
            return;
        }

        setSearchActive(true);
        console.log('filtering...');
        // TODO: filter OP latest replies
        const matches = data.filter(item => {
            const matchText = changedText.toUpperCase();
            return item?.subject?.toUpperCase().includes(matchText) ||
                item?.comment?.toUpperCase().includes(matchText) ||
                item?.name?.toUpperCase().includes(matchText) ||
                item?.filename?.toUpperCase().includes(matchText) ||
                item?.fileExtension?.toUpperCase().includes(matchText)
        });

        setFilteredData(matches);
    }

    const handleCancel = () => {
        searchInputRef.current?.clear();
        searchInputRef.current?.blur();
        handleChangeText('');
        onCancel?.();
    }

    const handleClear = () => {
        searchInputRef.current?.clear();
        handleChangeText('');
        onClear?.();
    }

    return (
        <View style={styles.container}>
            <IconButton name='arrow-back' size={24} color='#333' onPress={handleCancel} />
            <TextInput
                ref={searchInputRef}
                style={styles.input}
                onChangeText={handleChangeText}
                value={searchText}
                placeholder={'Search'}
                autoFocus={true}
            />
            {searchText &&
                <IconButton name='clear' size={24} color='#333' onPress={handleClear} />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        // margin: 12,
        // marginBottom: 0,
        // borderWidth: 1,
        // padding: 10,
        paddingVertical: 16,
        fontSize: 16,
    },
});
