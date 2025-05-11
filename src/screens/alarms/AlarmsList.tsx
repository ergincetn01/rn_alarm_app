import {View, Text, FlatList} from 'react-native';
import React, {FC, useState} from 'react';
import {Alarm} from '../../model/alarmTypes';
import {IMainStackScreen} from '../../navigation/types';
import DetailModal from './DetailModal';
import AlarmItem from './AlarmItem';
type Props = IMainStackScreen<'List'>;

const AlarmsList: FC<Props> = () => {
  const handleSelect = (item: Alarm) => {
    setSelectedAlarm(item);
    setVisible(true);
  };

  const [alarms, setAlarms] = useState<Alarm[]>([
    {
      id: 1,
      deleteAfterPlayed: true,
      time: '20.20',
      title: 'sabah',
    },
    {
      id: 2,
      deleteAfterPlayed: true,
      time: '20.20',
      title: 'uyaannnn',
    },
    {
      id: 467,
      deleteAfterPlayed: true,
      time: '12.20',
      title: '',
    },
    {
      id: 798,
      deleteAfterPlayed: true,
      time: '16.32',
      title: 'spor yappp',
    },
    {
      id: 8,
      deleteAfterPlayed: true,
      time: '20.20',
      title: 'sabah',
    },
    {
      id: 10,
      deleteAfterPlayed: true,
      time: '20.20',
      title: 'sabah',
    },
    {
      id: 21,
      deleteAfterPlayed: true,
      time: '20.20',
      title: 'uyaannnn',
    },
    {
      id: 4,
      deleteAfterPlayed: true,
      time: '12.20',
      title: '',
    },
    {
      id: 765,
      deleteAfterPlayed: true,
      time: '16.32',
      title: 'spor yappp',
    },
    {
      id: 85,
      deleteAfterPlayed: true,
      time: '20.28',
      title: 'sabah',
    },
  ]);

  const [selectedAlarm, setSelectedAlarm] = useState<Alarm>(alarms[0]);

  const [visible, setVisible] = useState<boolean>(false);

  const updateItem = (t: string) => {
    setAlarms(prevAlarms => {
      const index = prevAlarms.findIndex(a => a.id === selectedAlarm.id);
      if (index === -1) {
        return prevAlarms;
      }

      const updated = [...prevAlarms];
      updated[index] = {
        ...updated[index],
        title: t,
      };

      setSelectedAlarm(updated[index]);
      return updated;
    });
    setVisible(false);
  };

  return (
    <View className="p-4 flex-1">
      <View className="w-full items-center">
        <Text className="text-2xl">AlarmsList</Text>
      </View>
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          bounces={false}
          alwaysBounceVertical={false}
          overScrollMode="never"
          keyExtractor={item => item.id.toString()}
          data={alarms}
          renderItem={({item}) => (
            <AlarmItem item={item} onSelect={handleSelect} />
          )}
          contentContainerStyle={{
            flexGrow: 1,
            rowGap: 12,
            paddingTop: 20,
            paddingBottom: 50,
          }}
        />
      </View>
      <DetailModal
        onUpdate={updateItem}
        modalData={selectedAlarm}
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </View>
  );
};

export default AlarmsList;
