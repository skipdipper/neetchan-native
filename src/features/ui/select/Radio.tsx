import Icon from 'react-native-vector-icons/MaterialIcons';
import IconButton from '../IconButton';

export type RadioProps<T> = {
  value: T;
  groupValue: T;
  onChanged?: (value: T) => void;
};

export default function Radio<T>({
  value,
  groupValue,
  onChanged
}: RadioProps<T>) {
  const handleChange = () => {
    if (groupValue === value) return;
    onChanged?.(value);
  };

  if (value === groupValue) {
    return (
      <IconButton
        onPress={handleChange}
        name="radio-button-checked"
        size={24}
      />
    );
  }

  return (
    <IconButton
      onPress={handleChange}
      name="radio-button-unchecked"
      size={24}
    />
  );
}
