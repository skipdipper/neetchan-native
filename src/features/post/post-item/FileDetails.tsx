import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatBytes } from '../../../utils';

type FileDetailsProps = {
  filename: string;
  fileExtension: string;
  fileSize: number;
  width: number;
  height: number;
};

/* File name, extension, size, dimensions */
export default function FileDetails({
  filename,
  fileExtension,
  fileSize,
  width,
  height
}: FileDetailsProps) {
  const sizeFormat = formatBytes(fileSize, 1);

  return (
    <View style={styles.container}>
      <Text style={[styles.textContainer, styles.underline]}>
        {filename}
        {fileExtension}
      </Text>
      <Text style={styles.textContainer}>{sizeFormat}</Text>
      <Text style={styles.textContainer}>
        ({width}x{height})
      </Text>
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
  },
  underline: {
    textDecorationLine: 'underline'
  }
});
