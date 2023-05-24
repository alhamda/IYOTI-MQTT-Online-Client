export type PublishItem = {
  id: string,
  topic: string,
  message: string,
  qos: number,
  date: Date,
  retain: boolean,
}