import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import { IconProps } from 'react-native-vector-icons/Icon';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IconButtonProps extends PressableProps {}

export default function IconButton(
  { ...icon }: IconProps,
  { children, ...props }: IconButtonProps
) {
  return (
    <Pressable android_ripple={{ color: '#dddddd' }} {...props}>
      <Icon size={24} {...icon} />
    </Pressable>
  );
}
