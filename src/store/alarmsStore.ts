import {create} from 'zustand';
import {Alarm, AlarmPayload} from '../model/alarmTypes';
type AlarmStore = {
  alarms: Alarm[];
  deleteAlarm: (id: number) => void;
  addAlarm: (a: AlarmPayload) => void;
  setAlarms: (alarms: Alarm[]) => void;
};
const useAlarmsStore = create<AlarmStore>((set, get) => ({
  alarms: [],
  addAlarm: (a: Alarm) => set(state => ({alarms: [...state.alarms, a]})),
  deleteAlarm: (id: number) => {
    const a_ = get().alarms;
    const item = a_.find(a => a.id === id);
    if (item) {
      const updatedAlarms = a_.filter(alarm => alarm.id !== item.id);
      set(state => ({
        alarms: updatedAlarms,
      }));
    }
  },
  setAlarms: (a: Alarm[]) => set(state => ({alarms: a})),
}));

export default useAlarmsStore;
