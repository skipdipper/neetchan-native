import React from 'react';
import { StyleSheet, View } from 'react-native';
import ReplyPostList from '../post/post-preview/ReplyPostList';
import { Separator } from '../ui';
import ModalButton from '../ui/modal/ModalButton';
import { useModalHistorySyncContext } from '../ui/modal/ModalHistorySyncContext';
import { useModalVisibility } from '../ui/modal/ModalVisibilityContext';

type ThreadModalViewProps = {
  backdrop?: boolean;
};

export default function ThreadModalView({
  backdrop = true
}: ThreadModalViewProps) {
  const { modalRef } = useModalVisibility();
  const historyStack = useModalHistorySyncContext();

  const handleBack = () => {
    historyStack.pop();

    if (!historyStack.isEmpty()) {
      modalRef.current.registerChild(<ThreadModalView />);
    } else {
      modalRef.current.closeModal();
    }
  };

  const handleClose = () => {
    historyStack.clear();
    modalRef.current.closeAllModals();
  };

  const handleBackdrop = () => {
    handleBack();
  };

  return (
    <>
      {/* OVERRIDES BACKDROP DEFINED IN MODAL */}
      {backdrop && (
        <View style={styles.backdrop} onTouchEnd={handleBackdrop}></View>
      )}

      <View style={styles.container}>
        <View style={styles.actions}>
          <ModalButton title="back" onPress={handleBack} />
          <Separator direction="vertical" />
          <ModalButton title="close" onPress={handleClose} />
        </View>
        <ReplyPostList />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    width: '100%',
    height: '100%'
    // backgroundColor: 'rgba(54, 54, 54, 0.6)',
  },
  container: {
    flexShrink: 1,
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    paddingVertical: 4
  },
  actions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});
