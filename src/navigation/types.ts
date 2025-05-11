import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type MainStack = {
  List: undefined;
};

export type IMainStackScreen<T extends keyof MainStack> =
  NativeStackScreenProps<MainStack, T>;
