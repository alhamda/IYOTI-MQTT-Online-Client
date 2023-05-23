import { PublishItem } from '@/models/Publish';
import { Subscription, SubscriptionItem } from '@/models/Subscription';
import { RootState } from '@/redux/store';
import { generateRandomClientId, randomString } from '@/utils/helper';
import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  status: 'Connected' | 'Disconnected',
  subscriptions: Subscription[],
  publishes: PublishItem[],
  subscriptionItems: SubscriptionItem[],
  connection: Connection,
  setting: Setting,
};

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
    autoJson: true,
    autoScroll: false,
  }
}

export const mqttSlice = createSlice({
  name: 'mqtt',
  initialState: initialState,
  reducers: {
    reset: () => initialState,
    addPublish: (state, action) => {
      state.publishes.push(action.payload);
    },
    addSubscription: (state, { payload }: { payload: Subscription }) => {
      state.subscriptions.push(payload);
    },
    removeSubscription: (state, { payload }: { payload: Subscription }) => {
      return {
        ...state,
        subscriptions: state.subscriptions.filter((subscription) => subscription.id != payload.id),
        subscriptionItems: state.subscriptionItems.filter((item) => item.subscriptionId != payload.id)
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
  },
});

export const {
  reset,
  addSubscription,
  addSubscriptionItem,
  removeSubscription,
  setConnection,
  setSetting,
} = mqttSlice.actions;

export const selectSubscriptions = (state: RootState) => state.mqtt.subscriptions;
export const selectSubscriptionItems = (state: RootState) => state.mqtt.subscriptionItems;
export const selectPublishes = (state: RootState) => state.mqtt.publishes;
export const selectConnection = (state: RootState) => state.mqtt.connection;
export const selectSetting = (state: RootState) => state.mqtt.setting;


export default mqttSlice.reducer;