import { Text, StyleSheet } from 'react-native';

type ThreadStatsProps = {
  replies: number;
  images: number;
  uniqueIps: number;
  page: number;
  archived: boolean;
};

export default function ThreadStats({
  replies,
  images,
  uniqueIps,
  page,
  archived
}: ThreadStatsProps) {
  if (archived) {
    return <Text style={styles.text}>{`${replies}R / ${images}I`}</Text>;
  }

  return (
    <Text style={styles.text}>
      {`${replies}R / ${images}I / ${uniqueIps}P / Page ${page}`}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Rubik-Regular',
    fontWeight: 'bold',
    textAlignVertical: 'center'
  }
});
