import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatRelativeTime } from '../../../utils';

type PostDetailsProps = {
  name: string;
  postID: number;
  time: number;
};

/* Poster name, id, size, time */
export default function PostDetails({ name, postID, time }: PostDetailsProps) {
  const relativeTimeFormat = formatRelativeTime(time);

  return (
    <View style={styles.container}>
      <Text style={styles.textContainer}>{name}</Text>
      <Text style={styles.textContainer}>No. {postID}</Text>
      <Text style={styles.textContainer}>{relativeTimeFormat}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start'
  },
  textContainer: {
    fontSize: 10,
    marginRight: 2
  }
});
