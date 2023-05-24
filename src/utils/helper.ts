export function randomString(length: number) {
  let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';

  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];

  return result;
}

export function generateRandomClientId() {
  return 'mqtt_iyoti_' + randomString(10);
}

export function parseQoS(qos: number): 0 | 1 | 2 {
  return qos == 0 ? 0 : qos == 1 ? 1 : 2;
}