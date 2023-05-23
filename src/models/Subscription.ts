export type Subscription = {
  id: string,
  topic: string,
  qos: number,
}

export type SubscriptionItem = {
  id: string,
  subscriptionId: string,
  topic: string,
  message: string,
  qos: number,
  date: Date,
}