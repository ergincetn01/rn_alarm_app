import React, {useEffect} from 'react';
import {Pressable, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const SWITCH_WIDTH = 60;
const PILL_WIDTH = 25;
const PADDING = 5;
const ACTIVE_COLOR = 'green';
const DEFAULT_COLOR = '#ccc';

const Switch = ({isOn, onToggle}: {isOn: boolean; onToggle: () => void}) => {
  const translateX = useSharedValue(0);
  const animatedBgColor = useSharedValue<string>(DEFAULT_COLOR);

  const maxTranslate = SWITCH_WIDTH - PILL_WIDTH - PADDING * 2;

  const toggle = () => {
    onToggle();
    translateX.value = withTiming(!isOn ? maxTranslate : 0, {duration: 200});
    animatedBgColor.value = withTiming(isOn ? ACTIVE_COLOR : DEFAULT_COLOR, {
      duration: 300,
    });
  };

  useEffect(() => {
    translateX.value = withTiming(isOn ? maxTranslate : 0, {duration: 200});
    animatedBgColor.value = withTiming(isOn ? ACTIVE_COLOR : DEFAULT_COLOR, {
      duration: 300,
    });
  }, [isOn, animatedBgColor, translateX, maxTranslate]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
      backgroundColor: animatedBgColor.value,
    };
  });

  return (
    <Pressable
      onPress={toggle}
      style={{
        width: SWITCH_WIDTH,
        height: 35,
        borderRadius: 100,
        backgroundColor: '#fff',
        borderWidth: 1,
        paddingHorizontal: PADDING,
        justifyContent: 'center',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Animated.View
          style={[
            animatedStyle,
            {
              width: PILL_WIDTH,
              height: PILL_WIDTH,
              borderRadius: 100,
              position: 'absolute',
            },
          ]}
        />
      </View>
    </Pressable>
  );
};

export default Switch;
