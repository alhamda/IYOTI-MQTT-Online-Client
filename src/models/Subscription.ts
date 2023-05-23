export type Subscription = {
  id: string,
  topic: string,
  qos: number | 0 | 1 | 2,
}

export type SubscriptionItem = {
  id: string,
  subscriptionId?: string,
  topic: string,
  message: string,
  qos: number | 0 | 1 | 2,
  date: Date,
}