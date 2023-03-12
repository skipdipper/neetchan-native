import { ListRenderItemInfo, SafeAreaView, StyleSheet } from 'react-native';
import { GalleryItem } from '../features/gallery';
import { useThreadContext } from '../features/thread/ThreadContext';
import { GridView } from '../features/ui';
import { ThreadPost } from '../shared/types';

const getGalleryItems = (data: Map<number, ThreadPost>) => {
  const values = Array.from(data.values()).filter(item =>
    item.hasOwnProperty('fileExtension')
  );
  return values;
};

export default function GalleryScreen() {
  const threadData = useThreadContext();
  const galleryItems = getGalleryItems(threadData!.data);

  const keyExtractor = (item: ThreadPost) => String(item.postId);

  // TODO: NonNullable<ThreadPost> or Required<ThreadPost>
  const renderItem = ({ item }: ListRenderItemInfo<ThreadPost>) => {
    return (
      <GalleryItem
        tim={item.tim!}
        filename={item.filename!}
        fileExtension={item.fileExtension!}
        filesize={item.filesize!}
        thumbnailUrl={item.thumbnailUrl!}
        width={item.width!}
        height={item.height!}
      />
    );
  };

  return (
    <SafeAreaView>
      <GridView
        data={galleryItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={3}
        gap={2}
        // TODO: Remove this once using Flexbox gap
        style={{ margin: 2 }}
      />
    </SafeAreaView>
  );
}
