import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { useCatalogContext, CatalogContextInterface } from '../catalog/CatalogContext';
import { SearchContextInterface, useSearchContext } from './SearchContext';
import { SearchActiveContextInterface, useSearchActiveContext } from './SearchActiveContext';

export default function SearchInput() {
    const { data } = useCatalogContext() as CatalogContextInterface;
    const { searchText, setSearchText, filteredData, setFilteredData } = useSearchContext() as SearchContextInterface;
    const { setSearchActive } = useSearchActiveContext() as SearchActiveContextInterface;

    const handeChangeText = (changedText: string) => {
        setSearchText(changedText);

        if (!changedText) {
            console.log('Search input empty');
            setSearchActive(false);
            return;
        }

        setSearchActive(true);
        console.log('filtering...');
        // TODO: filter OP latest replies
        const matches: Array<any> = data.filter((item: any) => {
            const matchText = changedText.toUpperCase();
            return item?.sub?.toUpperCase().includes(matchText) ||
                item?.com?.toUpperCase().includes(matchText) ||
                item?.name?.toUpperCase().includes(matchText) ||
                item?.filename?.toUpperCase().includes(matchText)
        });

        setFilteredData(matches);
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={handeChangeText}
                value={searchText}
                placeholder={'Search'}
            />
            <Text style={styles.text}>
                {searchText
                    ? <Text>Found {filteredData.length} posts for "{searchText}"</Text>
                    : <Text>Search subjects, comments, names, and filenames</Text>
                }
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        height: 40,
        margin: 12,
        marginBottom: 0,
        borderWidth: 1,
        padding: 10,
    },
    text: {
        textAlignVertical: 'center',
        textAlign: 'center',
        padding: 8,
    }
});