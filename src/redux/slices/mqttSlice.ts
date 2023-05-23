import { PublishItem } from '@/models/Publish';
import { Subscription, SubscriptionItem } from '@/models/Subscription';
import { RootState } from '@/redux/store';
import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  status: 'Connected' | 'Disconnected',
  subscriptions: Subscription[],
  publishes: PublishItem[],
  subscriptionItems: SubscriptionItem[],
};

const initialState: initialStateType = {
  status: 'Disconnected',
  subscriptions: [],
  publishes: [],
  subscriptionItems: [],
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
      state.subscriptions = state.subscriptions.filter((subscription) => subscription.id != payload.id);
      state.subscriptionItems = state.subscriptionItems.filter((item) => item.subscriptionId != payload.id);
    },
    addSubscriptionItem: (state, action) => {
      state.subscriptionItems.push(action.payload);
    }
  },
});

export const { reset, addSubscription, addSubscriptionItem, removeSubscription } = mqttSlice.actions;

export const selectSubscriptions = (state: RootState) => state.mqtt.subscriptions;
export const selectSubscriptionItems = (state: RootState) => state.mqtt.subscriptionItems;
export const selectPublishes = (state: RootState) => state.mqtt.publishes;


export default mqttSlice.reducer;