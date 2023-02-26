import {
  FlatList,
  FlatListProps,
  FlexStyle,
  ListRenderItem,
  View,
} from 'react-native';

interface GridViewProps<ItemType>
  extends Omit<FlatListProps<ItemType>, 'horizontal'> {
  gap?: FlexStyle['margin'];
}

export default function GridView<ItemType>({
  numColumns = 2,
  renderItem,
  gap,
  ...props
}: GridViewProps<ItemType>) {
  // TODO: Flexbox gap instead of margin
  const renderItemWrapper: ListRenderItem<ItemType> = item => {
    return (
      <View style={{flex: 1 / numColumns, margin: gap}}>
        {renderItem?.(item)}
      </View>
    );
  };

  return (
    <FlatList
      numColumns={numColumns}
      horizontal={false}
      renderItem={renderItemWrapper}
      {...props}
    />
  );
}
