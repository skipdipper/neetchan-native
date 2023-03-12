import React, { useState } from 'react';
import { StyleSheet, Image, ActivityIndicator } from 'react-native';

type GalleryImageProps = {
  uri: string;
  onLoad?: () => void;
};

export default function GalleryImage({ uri, onLoad }: GalleryImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      <Image
        style={styles.image}
        source={{ uri: uri }}
        resizeMode="contain"
        onLoadEnd={handleLoad}
        progressiveRenderingEnabled={true}
      />
      <ActivityIndicator
        style={{ position: 'absolute' }}
        animating={isLoading}
      />
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    height: '100%',
    width: '100%'
  }
});
