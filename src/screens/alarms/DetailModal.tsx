import {
  View,
  Text,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {Alarm} from '../../model/alarmTypes';
type Props = {
  visible: boolean;
  onClose: () => void;
  overlayColor?: string;
  modalData: Alarm;
  onUpdate: (text: string) => void;
};

const DetailModal: FC<Props> = ({
  onClose,
  visible,
  overlayColor = 'rgba(0,0,0,0.6)',
  modalData,
  onUpdate,
}) => {
  const [txt, setTxt] = useState<string>('');

  useEffect(() => {
    setTxt(modalData.title);
  }, [modalData.title]);
  return (
    <Modal
      visible={visible}
      backdropColor={overlayColor}
      onRequestClose={onClose}>
      <Pressable
        onPress={onClose}
        style={{
          flex: 1,
          marginHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            style={{
              paddingVertical: 12,
              paddingHorizontal: 12,
              width: '100%',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderRadius: 12,
              shadowOffset: {
                height: 1,
                width: 1,
              },
              shadowColor: 'rgba(0,0,0,0.7)',
              elevation: 5,
              rowGap: 20,
            }}>
            <Text>{modalData.title} </Text>
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 6,
                borderWidth: 1,
                width: '100%',
              }}>
              <TextInput
                className="w-full"
                value={txt}
                onChangeText={t => setTxt(t)}
              />
            </View>
            <Pressable
              style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 6,
                borderWidth: 1,
                width: '50%',
                alignItems: 'center',
              }}
              onPress={() => onUpdate(txt)}>
              <Text>Update</Text>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

export default DetailModal;
