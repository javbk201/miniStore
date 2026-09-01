import { createMMKV } from 'react-native-mmkv'

export const storage = createMMKV()

export const Keys = {
  FAVORITES: 'favorites',
}