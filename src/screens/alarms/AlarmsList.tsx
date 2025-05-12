import {View, Text, FlatList} from 'react-native';
import React, {FC, useState} from 'react';
import {Alarm} from '../../model/alarmTypes';
import {IMainStackScreen} from '../../navigation/types';
import DetailModal from './DetailModal';
import AlarmItem from './AlarmItem';
import FloatingButton from '../../components/FloatingButton';
import useAlarmsStore from '../../store/alarmsStore';
type Props = IMainStackScreen<'List'>;

const AlarmsList: FC<Props> = ({navigation}) => {
  const {alarms, setAlarms} = useAlarmsStore();
  const navigateToCreate = () => {
    navigation.navigate('Create');
  };
  const handleSelect = (item: Alarm) => {
    setSelectedAlarm(item);
    setVisible(true);
  };

  const [selectedAlarm, setSelectedAlarm] = useState<Alarm>(alarms[0]);

  const [visible, setVisible] = useState<boolean>(false);

  const updateItem = (t: string) => {
    const index = alarms.findIndex(a => a.id === selectedAlarm.id);
    if (index === -1) {
      return;
    }

    const updated = [...alarms];
    updated[index] = {
      ...updated[index],
      title: t,
    };

    setAlarms(updated);
    setSelectedAlarm(updated[index]);
    setVisible(false);
  };

  const handleToggle = (item: Alarm) => {
    const updated = alarms.map(alarm =>
      alarm.id === item.id
        ? {...alarm, deleteAfterPlayed: !alarm.deleteAfterPlayed}
        : alarm,
    );
    setAlarms(updated);
    setVisible(false);
  };

  return (
    <View className="p-4 flex-1 bg-white">
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
            <AlarmItem
              handleToggle={() => handleToggle(item)}
              item={item}
              onSelect={handleSelect}
            />
          )}
          contentContainerStyle={{
            flexGrow: 1,
            rowGap: 12,
            paddingTop: 20,
            paddingBottom: 50,
          }}
        />
      </View>
      {selectedAlarm && (
        <DetailModal
          onUpdate={updateItem}
          modalData={selectedAlarm}
          visible={visible}
          onClose={() => setVisible(false)}
        />
      )}
      <FloatingButton onPress={navigateToCreate} />
    </View>
  );
};

export default AlarmsList;
