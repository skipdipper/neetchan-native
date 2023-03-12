import AppBar from '../ui/Appbar';
import BackButton from '../ui/BackButton';
import IconButton from '../ui/IconButton';
import ThreadHeaderTitle from './ThreadHeaderTitle';
import ThreadPopupMenuButton from './ThreadPopuMenuButton';
import { useNavigation } from '@react-navigation/native';

export default function ThreadHeaderBar() {
  const navigation = useNavigation<any>();

  return (
    <AppBar
      leading={<BackButton size={24} color="#fff" />}
      title={<ThreadHeaderTitle color="#fff" />}
      actions={[
        <IconButton name="file-download" size={24} color="#fff" />,
        <IconButton
          name="photo"
          size={24}
          color="#fff"
          onPress={() => {
            navigation.navigate('Gallery');
          }}
        />,
        <IconButton name="bookmark" size={24} color="#fff" />,
        <ThreadPopupMenuButton />
      ]}
    />
  );
}
