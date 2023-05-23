//=========================================
// Copied from MQTTX Source
//=========================================

import { SubscriptionItem } from "@/models/Subscription"

export const matchTopicMethod = (filter: string, topic: string): boolean => {
  let _filter = filter;
  let _topic = topic;

  if (filter.includes('$share')) {
    // shared subscription format: $share/{ShareName}/{filter}
    _filter = filter.split('/').slice(2).join('/');
  }

  const filterArray: string[] = _filter.split('/');
  const length: number = filterArray.length;
  const topicArray: string[] = _topic.split('/');

  for (let i = 0; i < length; i += 1) {
    const left: string = filterArray[i];
    const right: string = topicArray[i];

    if (left === '#') {
      return topicArray.length >= length - 1;
    }

    if (left !== right && left !== '+') {
      return false;
    }
  }

  return length === topicArray.length;
}

const topicMatch = (data: SubscriptionItem[], currentTopic: string): Promise<SubscriptionItem[]> =>
  new Promise((resolve, reject) => {
    try {
      const filterData = data.filter((item) => matchTopicMethod(currentTopic, item.topic));
      return resolve(filterData);
    } catch (error) {
      return reject(error);
    }
  })

export default topicMatch