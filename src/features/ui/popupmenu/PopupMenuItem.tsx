import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type PopupMenuItemProps = {
  child: NonNullable<React.ReactNode>;
  action?: () => void;
};

export default function PopupMenuItem({ child, action }: PopupMenuItemProps) {
  const handlePress = () => {
    action?.();
  };

  if (!child) {
    return null;
  }

  if (!React.isValidElement(child)) {
    child = <Text style={styles.text}>{child}</Text>;
  }

  return (
    <Pressable
      style={styles.container}
      onPress={handlePress}
      android_ripple={{ color: '#dddddd' }}
    >
      {child}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    paddingVertical: 10
  },
  text: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    // Fix bold text getting cut-off
    fontFamily: 'Rubik-Regular',
    alignSelf: 'stretch',
    textAlign: 'left'
  }
});
