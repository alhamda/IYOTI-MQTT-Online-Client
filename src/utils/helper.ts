export function randomString(length: number) {
  let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';

  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];

  return result;
}

export function generateRandomClientId(){
  return 'mqtt_iyoti_' + randomString(10);
}