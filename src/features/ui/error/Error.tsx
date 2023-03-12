import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type ErrorProps = {
  title: string;
  subtitle?: string;
  child?: React.ReactNode;
};

export default function Error({ title, subtitle, child }: ErrorProps) {
  return (
    <View style={styles.container}>
      <View style={{ alignContent: 'flex-start' }}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text>{subtitle}</Text>}
      </View>

      <View>{child}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4
  },
  title: {
    fontFamily: 'Rubik-Regular',
    fontSize: 24,
    fontWeight: 'bold'
  }
});
