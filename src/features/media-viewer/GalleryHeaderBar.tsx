import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type GalleryHeaderBarProps = {
  filename: string;
  fileExtension: string;
  pageIndex?: number;
};

export default function GalleryHeaderBar({
  filename,
  fileExtension,
  pageIndex = 0
}: GalleryHeaderBarProps) {
  const route = useRoute<any>();
  const { images } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={styles.title}
          selectable={true}
          selectionColor="orange"
        >
          {filename}
          {fileExtension}
        </Text>
        <Text>
          {pageIndex}/{images}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '90%',
    flexDirection: 'row'
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500'
    // backgroundColor: 'orange',
  }
});
