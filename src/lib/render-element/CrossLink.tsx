import React from 'react';
import { StyleSheet, Text } from 'react-native';
import PressableHighlight from '../../features/ui/PressableHighlight';

type CrossLinkProps = {
  children: React.ReactNode;
  href: string;
};

export default function CrossLink({ children, href }: CrossLinkProps) {
  const handlePress = () => {
    // TODO: navigate to linked Thread screen
    console.log(`Pressed on Crosslink ${href}`);
  };

  return (
    <PressableHighlight onPress={handlePress}>
      <Text style={styles.crosslink}>{children}</Text>
    </PressableHighlight>
  );
}

const styles = StyleSheet.create({
  crosslink: {
    color: 'orange',
    textDecorationLine: 'underline'
  }
});
