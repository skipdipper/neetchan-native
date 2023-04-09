import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { PostItem } from '..';
import { useThreadContext } from '../../thread/ThreadContext';
import { Separator } from '../../ui';
import { useModalHistorySyncContext } from '../../ui/modal/ModalHistorySyncContext';

export default function ReplyPostList() {
  const { data: thread } = useThreadContext();

  const historyStack = useModalHistorySyncContext();
  const replies = historyStack.peek() as Set<number>;
  // console.log('Pushed to Stack:', replies);
  // console.log('Current Stack Size:', historyStack.size());

  const renderItem = ({ item }: { item: number }) => (
    <PostItem item={thread.get(item)} catalog={false} />
  );

  const keyExtractor = (item: number) => String(item);

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={Array.from(replies)}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ItemSeparatorComponent={Separator}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center'
  }
});
