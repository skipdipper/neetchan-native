import React, { useRef } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import {
  ScrollControllerContextInterface,
  useScrollControllerContext
} from '../features/media-viewer/ScrollControllerContext';
import Thread from '../features/thread/Thread';
import { AppStatusBar } from '../features/ui';
import Modal from '../features/ui/modal/Modal';
import { ModalHistorySyncProvider } from '../features/ui/modal/ModalHistorySyncContext';
import {
  ModalVisibilityContextInterface,
  useModalVisibility
} from '../features/ui/modal/ModalVisibilityContext';

type ThreadScreenProps = {
  navigation: any;
  route: any;
};

export default function ThreadScreen({ navigation, route }: ThreadScreenProps) {
  const { modalRef } = useModalVisibility() as ModalVisibilityContextInterface;
  const { scrollRef } =
    useScrollControllerContext() as ScrollControllerContextInterface;

  const prevScrollRef = useRef<FlatList | null>(null);

  // callback ref for keeping track of prev ref and current ref
  // for scroll controller to maintain reference of components between screen navigations
  // that would otherwise cause scrollRef.current to be null on unmount of component referenced
  // See: https://tkdodo.eu/blog/avoiding-use-effect-with-callback-refs
  const threadRef = React.useCallback((node: FlatList) => {
    if (node === null) {
      // ref component unmounted
      // console.log('Thread flatlist unmounted');
      // Restore scrollRef to previous component to be controlled again
      scrollRef.current = prevScrollRef.current;
    } else if (node !== null) {
      // ref component mounted
      // console.log('Thread flatlist mounted');
      // Store ref of previous component that was controlled
      prevScrollRef.current = scrollRef.current;
      // Reassign scrollRef to new component to be controlled
      scrollRef.current = node;
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <AppStatusBar />
      <ModalHistorySyncProvider>
        {/* <Thread ref={scrollRef} board={'a'} /> */}
        <Thread ref={threadRef} />
        {/* Single Modal instance per Screen  */}
        <Modal ref={modalRef} />
      </ModalHistorySyncProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
});
