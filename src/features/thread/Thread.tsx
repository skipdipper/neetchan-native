import { useFocusEffect, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  View
} from 'react-native';
import Repository from '../../data/repository/Repository';
import { PostItem } from '../post';
import { Separator } from '../ui';
import CircularProgressIndicator from '../ui/CircularProgressIndicator';
import Error from '../ui/error/Error';
import {
  ModalHistorySyncContextInterface,
  useModalHistorySyncContext
} from '../ui/modal/ModalHistorySyncContext';
import {
  ModalVisibilityContextInterface,
  useModalVisibility
} from '../ui/modal/ModalVisibilityContext';
import { ThreadContextInterface, useThreadContext } from './ThreadContext';
import ThreadStats from './ThreadStats';

function Thread({}, ref: React.Ref<FlatList>) {
  const route = useRoute<any>();
  const { modalRef } = useModalVisibility() as ModalVisibilityContextInterface;
  const historyStack =
    useModalHistorySyncContext() as ModalHistorySyncContextInterface;
  const { data: thread, setData } =
    useThreadContext() as ThreadContextInterface;
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getThread();
    setRefreshing(false);
  }, []);

  const { board, threadId } = route.params;

  const getThread = async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      const thread = await Repository.getThread(board, threadId);
      setData(thread);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getThread();
  }, []);

  // Close and reopen Modal when navigating to and from Gallery screen
  useFocusEffect(
    useCallback(() => {
      if (!historyStack.isEmpty()) {
        modalRef.current.openModal();
      }

      // modalRef will be null on unmount
      return () => modalRef.current?.closeModal();
    }, [])
  );

  const data = Array.from(thread.values());

  const renderItem: ListRenderItem<any> = ({ item }) => (
    <PostItem item={item} catalog={false} />
  );

  const listFooterComponent = () => {
    const { replies, images, uniqueIps, archived } = data[0] || {};
    return (
      <ThreadStats
        replies={replies}
        images={images}
        uniqueIps={uniqueIps}
        page={0}
        archived={archived}
      />
    );
  };

  const keyExtractor = (item: any) => String(item.postId);

  if (isError) return <Error title="Network Error" />;

  return (
    <View style={styles.container}>
      {isLoading ? (
        <CircularProgressIndicator />
      ) : (
        <FlatList
          ref={ref}
          data={data}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={renderItem}
          ItemSeparatorComponent={Separator}
          ListFooterComponent={listFooterComponent}
          ListFooterComponentStyle={styles.listFooterComponentStyle}
        />
      )}
    </View>
  );
}
export default React.forwardRef(Thread);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 4
  },
  listFooterComponentStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  }
});
