import { useMMKVObject } from 'react-native-mmkv';
import { Board } from '../../shared/types';

export default function useBoard() {
  const [boardList, setBoardList] = useMMKVObject<Board[]>('board.all');

  return [boardList, setBoardList] as const;
}
