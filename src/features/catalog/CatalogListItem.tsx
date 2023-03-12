import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PostItem } from '../post';
import { CatalogPost } from '../../shared/types';

type CatalogListItemProps = {
  item: CatalogPost;
};

export default function CatalogListItem({ item }: CatalogListItemProps) {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{ color: '#dddddd' }}
        onPress={() => {
          console.log(`Pressed on thread ${item.postId}`);
          // Navigating to NestedThread inside nested navigator
          navigation.navigate('Thread', {
            screen: 'NestedThread',
            params: { board: item.board, threadId: item.postId }
          });
        }}
      >
        <PostItem item={item} catalog={true} />

        <View style={{ flexDirection: 'row' }}>
          <Text>{item.replies} replies, </Text>
          <Text>{item.images} images</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
});
