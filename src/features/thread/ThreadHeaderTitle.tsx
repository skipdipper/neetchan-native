import { useRoute } from '@react-navigation/native';
import React from 'react';
import { ColorValue, StyleSheet, Text, TextProps } from 'react-native';
import RenderHtml from '../../lib/RenderHtml';
import { useThreadContext } from './ThreadContext';

interface ThreadHeaderTitleProps extends TextProps {
  title?: string;
  color?: ColorValue;
}

function ThreadHeaderTitle({
  title,
  color,
  ...textprops
}: ThreadHeaderTitleProps) {
  const route = useRoute<any>();
  const { threadId } = route.params;

  // TODO: fix re-render when navigation to gallery modal
  const { data: thread } = useThreadContext();
  const { subject, comment } = thread.get(threadId) || {};
  // subject or comment may be stll be undefined if fetching thread
  const headerTitle = subject ?? comment ?? '';

  return (
    <Text
      style={[styles.text, { color: color }]}
      ellipsizeMode="tail"
      numberOfLines={1}
      {...textprops}
    >
      {/* TODO: override child text styles */}
      <RenderHtml html={headerTitle} />
    </Text>
  );
}
export default React.memo(ThreadHeaderTitle);

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Rubik-Medium',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
