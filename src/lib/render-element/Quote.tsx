import React from 'react';
import { StyleSheet, Text } from 'react-native';

type QuoteProps = {
  children: React.ReactNode;
};

export default function Quote({ children }: QuoteProps) {
  return <Text style={styles.quote}>{children}</Text>;
}

const styles = StyleSheet.create({
  quote: {
    color: 'yellowgreen'
  }
});
