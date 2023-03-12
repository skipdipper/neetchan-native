import React from 'react';
import { StyleSheet, Text } from 'react-native';
import RenderHtml from '../../../lib/RenderHtml';

type SubjectProps = {
  subject: string;
};

export default function Subject({ subject }: SubjectProps) {
  return (
    <Text style={styles.subject}>
      <RenderHtml html={subject} />
    </Text>
  );
}

const styles = StyleSheet.create({
  subject: {
    color: '#0f0c5d',
    fontWeight: '300'
  }
});
