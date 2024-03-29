import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import CatalogHeaderBar from '../features/catalog/CatalogHeaderBar';
import CatalogList from '../features/catalog/CatalogList';
import CatalogListItem from '../features/catalog/CatalogListItem';
import { useScrollControllerContext } from '../features/media-viewer/ScrollControllerContext';
import { useSearchActiveContext } from '../features/search/SearchActiveContext';
import SearchResult from '../features/search/SearchResult';
import { AppStatusBar } from '../features/ui';
import Modal from '../features/ui/modal/Modal';
import { useModalVisibility } from '../features/ui/modal/ModalVisibilityContext';

type CatalogScreenProps = {
  navigation: any;
  route: any;
};

export default function CatalogScreen({
  navigation,
  route
}: CatalogScreenProps) {
  // TODO: React.Memo to prevent re-rendering from subscription to Context
  const { searchActive } = useSearchActiveContext();
  const { scrollRef } = useScrollControllerContext();
  const { modalRef } = useModalVisibility();

  const [board, setBoard] = useState('a');

  useEffect(() => {
    navigation.setOptions({
      header: () => <CatalogHeaderBar board={board} setBoard={setBoard} />
    });
  }, [navigation, board]); // board dependency required when toggling search

  // TODO: reattach scrollRef after navigating back from ThreadScreen
  useFocusEffect(
    React.useCallback(() => {
      console.log('useFocusEffect ran for CatalogScreen');
      // console.log('scrollRef', scrollRef);
    }, [scrollRef.current])
  );

  console.log('CatalogScreen Render');
  const renderItem = ({ item }: { item: any }) => (
    <CatalogListItem item={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppStatusBar />
      {searchActive ? (
        <SearchResult renderItem={renderItem} />
      ) : (
        <CatalogList ref={scrollRef} board={board} />
      )}
      <Modal ref={modalRef} transparent={true} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
});
