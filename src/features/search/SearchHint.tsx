import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSearchContext } from './SearchContext';

export default function SearchHint() {
  const { searchText, filteredData } = useSearchContext();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {searchText ? (
          <Text>
            Found {filteredData.length} posts for "{searchText}"
          </Text>
        ) : (
          <Text>Search subjects, comments, names, and filenames</Text>
        )}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  text: {
    textAlignVertical: 'center',
    textAlign: 'center',
    padding: 8,
    fontSize: 12
  }
});
