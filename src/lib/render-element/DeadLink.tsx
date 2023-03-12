import React from 'react';
import { StyleSheet, Text } from 'react-native';
import PressableHighlight from '../../features/ui/PressableHighlight';

type DeadLinkProps = {
  children: React.ReactNode;
};

export default function DeadLink({ children }: DeadLinkProps) {
  const handlePress = () => {
    // TODO: navigate to archived WebView
    console.log(`Pressed on Deadlink`);
  };

  return (
    <PressableHighlight onPress={handlePress}>
      <Text style={styles.deadlink}>{children}</Text>
    </PressableHighlight>
  );
}

const styles = StyleSheet.create({
  deadlink: {
    textDecorationLine: 'line-through',
    color: 'orange'
  }
});
