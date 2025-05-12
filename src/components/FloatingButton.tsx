import {View, Text, Pressable} from 'react-native';
import React from 'react';

const FloatingButton = ({onPress}: {onPress: () => void}) => {
  return (
    <Pressable
      onPress={onPress}
      className="bg-blue-600 rounded-full justify-center items-center w-20 h-20 absolute right-4 bottom-4">
      <Text className="font-medium text-5xl text-white">+</Text>
    </Pressable>
  );
};

export default FloatingButton;
