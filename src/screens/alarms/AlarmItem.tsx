// AlarmItem.tsx
import React from 'react';
import {Pressable, Text, View, StyleSheet} from 'react-native';
import {Alarm} from '../../model/alarmTypes';
import Switch from '../../components/Switch';

interface AlarmItemProps {
  item: Alarm;
  onSelect: (alarm: Alarm) => void;
  handleToggle: (i: Alarm) => void;
}

const AlarmItem: React.FC<AlarmItemProps> = ({
  item,
  onSelect,
  handleToggle,
}) => {
  return (
    <Pressable onPress={() => onSelect(item)} style={styles.alarmItem}>
      <View className="items-start">
        <Text className="text-xl font-medium">{item.time}</Text>
        <Text className="text-xl">
          {item.title === '' ? 'Başlık Yok' : item.title}
        </Text>
      </View>

      <Switch
        isOn={item.deleteAfterPlayed}
        onToggle={() => handleToggle(item)}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  alarmItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 40,
    borderWidth: 0.7,
    backgroundColor: 'rgb(250,250,250)',
    borderColor: 'rgb(97,97,97)',
  },
});

export default AlarmItem;
