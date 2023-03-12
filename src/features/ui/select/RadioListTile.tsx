import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Radio, { RadioProps } from './Radio';

type RadioListTileProps<T> = {
  title: string;
} & RadioProps<T>;

export default function RadioListTile<T>({
  title,
  value,
  groupValue,
  onChanged
}: RadioListTileProps<T>) {
  const handleChange = () => {
    if (groupValue === value) return;
    onChanged?.(value);
  };

  return (
    <Pressable
      android_ripple={{ color: '#dddddd' }}
      pointerEvents="box-only"
      onPress={handleChange}
    >
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
        <Radio value={value} groupValue={groupValue} onChanged={onChanged} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10
  },
  text: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontFamily: 'Rubik-Regular',
    alignSelf: 'stretch',
    textAlign: 'left'
  }
});
