import { StyleSheet, Text, View } from 'react-native';

type OptionProps = {
  value: string | number | boolean;
  children: string;
};

export default function Option({ value, children }: OptionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  text: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    // Fix bold text getting cut-off
    fontFamily: 'Rubik-Regular',
    alignSelf: 'stretch',
    textAlign: 'left'
  }
});
