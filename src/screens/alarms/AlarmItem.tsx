// AlarmItem.tsx
import React from 'react';
import {Pressable, Text, View, StyleSheet} from 'react-native';
import {Alarm} from '../../model/alarmTypes';

interface AlarmItemProps {
  item: Alarm;
  onSelect: (alarm: Alarm) => void;
}

const AlarmItem: React.FC<AlarmItemProps> = ({item, onSelect}) => {
  return (
    <Pressable onPress={() => onSelect(item)} style={styles.alarmItem}>
      <View className="items-start">
        <Text className="text-xl font-medium">{item.time}</Text>
        <Text className="text-xl">
          {item.title === '' ? 'Başlık Yok' : item.title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  alarmItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 0.7,
    borderColor: 'rgb(97,97,97)',
  },
});

export default AlarmItem;
