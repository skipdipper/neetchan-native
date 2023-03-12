import React, { useState, createContext } from 'react';
import { StyleSheet, Text } from 'react-native';

export const SpoilerContext = createContext(false);

type SpoilerTextProps = {
  children: React.ReactNode;
};

export default function SpoilerText({ children }: SpoilerTextProps) {
  const [isSpoiled, setIsSpoiled] = useState(false);

  const handleOnPress = () => {
    console.log(`Pressed on SpoilerText`);
    setIsSpoiled(spoiled => !spoiled);
  };

  return (
    // TODO: Fix quote and link elements default color overriding default color of black
    <SpoilerContext.Provider value={isSpoiled}>
      <Text
        style={[styles.container, { color: isSpoiled ? 'white' : 'black' }]}
        onPress={handleOnPress}
      >
        {children}
      </Text>
    </SpoilerContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black'
  }
});
