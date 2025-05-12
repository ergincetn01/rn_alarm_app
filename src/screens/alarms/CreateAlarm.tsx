import {View, Text, TextInput, Pressable, ScrollView} from 'react-native';
import React, {FC, useState} from 'react';
import {IMainStackScreen} from '../../navigation/types';
import {useFormik} from 'formik';
import {Alarm, AlarmPayload} from '../../model/alarmTypes';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import useAlarmsStore from '../../store/alarmsStore';
import Switch from '../../components/Switch';
type Props = IMainStackScreen<'Create'>;
const CreateAlarm: FC<Props> = ({navigation}) => {
  const {addAlarm} = useAlarmsStore();

  const goBack = () => navigation.goBack();

  const handleCreateAlarm = () => {
    const id = Math.floor(Math.random() * 100);
    const payload: AlarmPayload = {
      deleteAfterPlayed: values.deleteAfterPlayed,
      id: id,
      time: `${new Date(values.time)
        .getHours()
        .toString()
        .padStart(2, '0')}:${new Date(values.time)
        .getMinutes()
        .toString()
        .padStart(2, '0')}`,
      title: values.title,
    };
    resetForm();
    addAlarm(payload);
    navigation.goBack();
  };

  const {values, setFieldValue, resetForm} = useFormik<Alarm>({
    initialValues: {
      deleteAfterPlayed: false,
      id: 0,
      time: new Date().toString(),
      title: '',
    },
    onSubmit: handleCreateAlarm,
    validateOnChange: false,
    validateOnBlur: false,
  });

  const handleChangeTitle = (t: string) => {
    setFieldValue('title', t);
  };
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const onChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    if (event.type === 'set' && selectedTime) {
      setShowPicker(false);
      setFieldValue('time', selectedTime);
    }
    setShowPicker(false);
  };

  return (
    <ScrollView
      style={{backgroundColor: '#fff'}}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{flex: 1, padding: 20, rowGap: 12}}>
      <View className="flex-row items-center justify-between">
        <Pressable onPress={goBack}>
          <Text className="text-2xl">X</Text>
        </Pressable>
        <Text>CreateAlarm</Text>
        <Pressable onPress={handleCreateAlarm}>
          <Text className="text-2xl">✓</Text>
        </Pressable>
      </View>
      <Pressable
        style={{
          borderWidth: 1,
          alignSelf: 'center',
          borderRadius: 8,
          paddingHorizontal: 16,
          paddingVertical: 4,
        }}
        onPress={() => setShowPicker(true)}>
        <Text className="text-3xl text-center">
          {`${new Date(values.time)
            .getHours()
            .toString()
            .padStart(2, '0')}:${new Date(values.time)
            .getMinutes()
            .toString()
            .padStart(2, '0')} `}
        </Text>
      </Pressable>
      {showPicker && (
        <DateTimePicker
          style={{backgroundColor: 'red'}}
          value={new Date(values.time)}
          display={'spinner'}
          onChange={onChange}
          mode="time"
          timeZoneName="Europe/Istanbul"
          themeVariant="dark"
        />
      )}

      <View className="gap-y-3">
        <View
          style={{
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 16,
            backgroundColor: 'lightgray',
          }}>
          <TextInput
            selectionColor="gray"
            placeholder="Etiket"
            value={values.title}
            onChangeText={handleChangeTitle}
            style={{padding: 0}}
          />
        </View>
        <View className="flex-row px-1 justify-between items-center w-full">
          <Text>Delete after played</Text>

          <Switch
            isOn={values.deleteAfterPlayed}
            onToggle={() =>
              setFieldValue('deleteAfterPlayed', !values.deleteAfterPlayed)
            }
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateAlarm;
