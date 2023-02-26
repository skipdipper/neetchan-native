import {useNavigation} from '@react-navigation/native';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Attachment, MimeType} from '../../shared/types';
import {formatBytes} from '../../utils';

interface GalleryItemProps
  extends Pick<
    Attachment,
    | 'tim'
    | 'filename'
    | 'fileExtension'
    | 'filesize'
    | 'thumbnailUrl'
    | 'width'
    | 'height'
  > {}

export default function GalleryItem({
  tim,
  filename,
  fileExtension,
  filesize,
  thumbnailUrl,
  width,
  height,
}: GalleryItemProps) {
  const navigation = useNavigation<any>();

  const handlePress = () =>
    navigation.navigate('MediaViewer', {
      tim: tim,
      filename: filename,
      fileExtension: fileExtension,
      catalog: false,
    });

  return (
    <Pressable onPress={handlePress}>
      <View>
        <Image
          style={styles.dimensions}
          source={{uri: thumbnailUrl}}
          progressiveRenderingEnabled={true}
        />

        <View style={styles.label}>
          <Text style={[{textTransform: 'uppercase'}, styles.text]}>
            {fileExtension.substring(1)} {width}x{height}
          </Text>
          <Text style={styles.text}>{formatBytes(filesize, 1)}</Text>
        </View>

        {fileExtension === MimeType.WEBM && (
          <View style={styles.video}>
            <Icon name="play-circle-outline" size={24} color="#fff" />
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  dimensions: {
    flex: 1,
    height: 120,
    width: '100%',
    resizeMode: 'cover',
  },
  label: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(54, 54, 54, 0.6)',
    padding: 2,
  },
  text: {
    fontSize: 10,
    color: 'white',
  },
  video: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
