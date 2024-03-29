import React from 'react';
import { StyleSheet, Text } from 'react-native';
import ThreadModalView from '../../features/thread/ThreadModalView';
import { useModalHistorySyncContext } from '../../features/ui/modal/ModalHistorySyncContext';
import { useModalVisibility } from '../../features/ui/modal/ModalVisibilityContext';
import PressableHighlight from '../../features/ui/PressableHighlight';

type QuoteLinkProps = {
  children: React.ReactNode;
  href: string;
};

export default function QuoteLink({ children, href }: QuoteLinkProps) {
  // TODO: Fix Render Error cannot read property 'modalRef ' of null
  const { modalRef } = useModalVisibility() || {};
  const historyStack = useModalHistorySyncContext();

  const postId = parseInt(href.slice(2));

  const handlePress = () => {
    console.log(`Pressed on Quotelink ${href}`);

    historyStack.push(new Set([postId]));

    modalRef.current.registerChild(<ThreadModalView />);
    modalRef.current.openModal();
  };

  return (
    // TODO: Fix Pressable vertical alignment with Text
    <PressableHighlight onPress={handlePress}>
      <Text style={styles.quotelink}>{children}</Text>
    </PressableHighlight>
  );
}

const styles = StyleSheet.create({
  quotelink: {
    color: 'orange',
    textDecorationLine: 'underline'
  }
});
