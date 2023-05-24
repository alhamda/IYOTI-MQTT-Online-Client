export type Subscription = {
  id: string,
  topic: string,
  qos: number | 0 | 1 | 2,
  isPaused?: boolean,
}

export type SubscriptionItem = {
  id: string,
  retain: boolean,
  subscriptionId?: string,
  topic: string,
  message: string,
  qos: number | 0 | 1 | 2,
  date: Date,
}