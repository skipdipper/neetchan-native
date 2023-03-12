import React from 'react';
import { Pressable, PressableProps } from 'react-native';

interface PressableHighlightProps extends PressableProps {}

export default function PressableHighlight({
  children,
  ...props
}: PressableHighlightProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'transparent'
        }
      ]}
      {...props}
    >
      {children}
    </Pressable>
  );
}
