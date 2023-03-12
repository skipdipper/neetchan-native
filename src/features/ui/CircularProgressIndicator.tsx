import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet
} from 'react-native';

interface CircularProgressIndicatorProps extends ActivityIndicatorProps {}

export default function CircularProgressIndicator(
  props: CircularProgressIndicatorProps
) {
  return (
    <ActivityIndicator
      animating={true}
      style={styles.indicator}
      size="large"
      color="orange"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  indicator: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
