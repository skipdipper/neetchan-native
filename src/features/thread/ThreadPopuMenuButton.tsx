import { useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Alert, Linking, Share } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useScrollControllerContext } from '../media-viewer/ScrollControllerContext';
import { PopupMenuButton, PopupMenuItem } from '../ui/popupmenu';

export default function ThreadPopupMenuButton() {
  const { scrollRef } = useScrollControllerContext();
  const route = useRoute<any>();

  const scrollToTop = () => {
    scrollRef.current?.scrollToIndex({
      animated: false,
      index: 0,
      viewPosition: 0
    });
  };

  const scrollToBottom = () => {
    // TODO: scroll to last index instead
    scrollRef.current?.scrollToEnd({ animated: false });
  };

  const share = async () => {
    const { board, threadId } = route.params;
    const message = `https://boards.4chan.org/${board}/thread/${threadId}`;
    const dialogTitle = 'share';

    try {
      const result = await Share.share({ message }, { dialogTitle });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // TODO: handle IOS share
        } else {
          // TODO: handle android share
        }
      } else if (result.action === Share.dismissedAction) {
        // TODO: handle dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const openBrowser = useCallback(async () => {
    const { board, threadId } = route.params;
    const url = `https://boards.4chan.org/${board}/thread/${threadId}`;

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);

  const icon = <Icon name="more-vert" size={24} color="#fff" />;

  return (
    <PopupMenuButton
      icon={icon}
      popupMenuEntry={[
        <PopupMenuItem child="search" />,
        <PopupMenuItem child="reload" />,
        <PopupMenuItem child="archive" />,
        <PopupMenuItem child="open in a browser" action={openBrowser} />,
        <PopupMenuItem child="share" action={share} />,
        <PopupMenuItem child="top" action={scrollToTop} />,
        <PopupMenuItem child="bottom" action={scrollToBottom} />
      ]}
    />
  );
}
