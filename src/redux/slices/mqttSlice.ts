import { PublishItem } from '@/models/Publish';
import { Subscription, SubscriptionItem } from '@/models/Subscription';
import { RootState } from '@/redux/store';
import { generateRandomClientId } from '@/utils/helper';
import { matchTopicMethod } from '@/utils/topicMatch';
import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  status: ConnectionStatus,
  subscriptions: Subscription[],
  publishes: PublishItem[],
  subscriptionItems: SubscriptionItem[],
  connection: Connection,
  setting: Setting,
};

export type ConnectionStatus = 'Connected' | 'Disconnected' | 'Connecting' | 'Disconnecting';

export type Connection = {
  host?: string,
  port?: number,
  clientId?: string,
  username?: string,
  password?: string,
  keepAlive?: number,
  cleanSession?: boolean,
  sslTls?: boolean,
  lastWill?: boolean,
  lastWillTopic?: string,
  lastWillQos?: '0' | '1' | '2',
  lastWillRetain?: boolean,
  lastWillMessage?: string
};

export type Setting = {
  autoScroll?: boolean,
  autoJson?: boolean,
};

const initialState: initialStateType = {
  status: 'Disconnected',
  subscriptions: [],
  publishes: [],
  subscriptionItems: [],
  connection: {
    host: 'free.mqtt.iyoti.id',
    port: 1883,
    clientId: generateRandomClientId(),
    keepAlive: 60,
    cleanSession: true,
    lastWill: false,
    lastWillQos: '0',
    lastWillRetain: false,
    sslTls: false,
  },
  setting: {
    autoJson: false,
    autoScroll: false,
  }
}

export const mqttSlice = createSlice({
  name: 'mqtt',
  initialState: initialState,
  reducers: {
    reset: () => initialState,
    setStatus: (state, { payload }: { payload: ConnectionStatus }) => {
      state.status = payload;
    },
    addPublish: (state, action) => {
      state.publishes.push(action.payload);
    },
    addSubscription: (state, { payload }: { payload: Subscription }) => {
      state.subscriptions.push(payload);
    },
    pauseSubscription: (state, { payload }: { payload: Subscription }) => {
      let index = state.subscriptions.findIndex(subscription => subscription.id == payload.id);
      if (index >= 0) {
        state.subscriptions[index] = { ...payload, isPaused: true };
      }
    },
    resumeSubscription: (state, { payload }: { payload: Subscription }) => {
      let index = state.subscriptions.findIndex(subscription => subscription.id == payload.id);
      if (index >= 0) {
        state.subscriptions[index] = { ...payload, isPaused: false };
      }
    },
    removeSubscription: (state, { payload }: { payload: Subscription }) => {
      if (state.subscriptions.length == 1) {

        return {
          ...state,
          subscriptions: [],
          subscriptionItems: [],
        };

      } else {

        return {
          ...state,
          subscriptions: state.subscriptions.filter((subscription) => subscription.id != payload.id),
          subscriptionItems: state.subscriptionItems.filter((item) => {
            return !matchTopicMethod(payload.topic, item.topic);
          })
        }
      }
    },
    addSubscriptionItem: (state, { payload }: { payload: SubscriptionItem }) => {
      state.subscriptionItems.push(payload);
    },
    setSetting: (state, { payload }: { payload: Setting }) => {
      state.setting = {
        ...state.setting,
        ...payload
      }
    },
    setConnection: (state, { payload }: { payload: Connection }) => {
      state.connection = {
        ...state.connection,
        ...payload
      }
    },
    clearHistory: (state, { payload }: { payload: Subscription | null }) => {
      if (payload?.topic) {
        state.subscriptionItems = state.subscriptionItems.filter((item) => {
          return !matchTopicMethod(payload.topic, item.topic);
        });
      } else {
        state.subscriptionItems = [];
      }
    }
  },
});

export const {
  reset,
  setStatus,
  addPublish,
  addSubscription,
  pauseSubscription,
  resumeSubscription,
  addSubscriptionItem,
  removeSubscription,
  setConnection,
  setSetting,
  clearHistory,
} = mqttSlice.actions;

export const selectSubscriptions = (state: RootState) => state.mqtt.subscriptions;
export const selectSubscriptionItems = (state: RootState) => state.mqtt.subscriptionItems;
export const selectPublishes = (state: RootState) => state.mqtt.publishes;
export const selectConnection = (state: RootState) => state.mqtt.connection;
export const selectSetting = (state: RootState) => state.mqtt.setting;
export const selectStatus = (state: RootState) => state.mqtt.status;

export default mqttSlice.reducer;