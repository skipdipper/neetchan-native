import IconButton from '../ui/IconButton';

type SearchButtonProps = {
  onPress: () => void;
};

export default function SearchButton({ onPress }: SearchButtonProps) {
  return <IconButton name="search" size={24} color="#333" onPress={onPress} />;
}
