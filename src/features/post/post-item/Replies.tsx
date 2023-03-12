import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
import ThreadModalView from '../../thread/ThreadModalView';
import {
  ModalHistorySyncContextInterface,
  useModalHistorySyncContext
} from '../../ui/modal/ModalHistorySyncContext';
import {
  useModalVisibility,
  ModalVisibilityContextInterface
} from '../../ui/modal/ModalVisibilityContext';

type SubjectProps = {
  replies: Set<number>;
};

export default function Replies({ replies }: SubjectProps) {
  const { modalRef } = useModalVisibility() as ModalVisibilityContextInterface;
  const historyStack =
    useModalHistorySyncContext() as ModalHistorySyncContextInterface;

  const handlePress = () => {
    console.log('Pressed on Repies');

    historyStack.push(replies);
    // The logs below work as expected because Modal History methods are Synchronous
    // The logs would otherwise be STALE if Modal History methods are Asynchronous
    // console.log('size', historyStack.size());
    // console.log('peek', historyStack.peek());

    modalRef.current.registerChild(<ThreadModalView />);
    modalRef.current.openModal();
  };

  return (
    <Pressable
      onPress={handlePress}
      android_ripple={{ color: '#dddddd' }}
      style={styles.button}
    >
      <Text>
        {replies.size} {replies.size == 1 ? `reply` : `replies`}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    // padding: 8,
    paddingTop: 8
  }
});
