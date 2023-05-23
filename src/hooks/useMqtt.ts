import { Subscription, SubscriptionItem } from '@/models/Subscription';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addSubscriptionItem, selectConnection, selectSubscriptions, setStatus } from '@/redux/slices/mqttSlice';
import mqtt, { MqttClient } from 'precompiled-mqtt';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

export default function useMqtt() {
  const dispatch = useAppDispatch();

  const [client, setClient] = useState<MqttClient | null>(null);
  const connection = useAppSelector(selectConnection);
  const subscriptions = useAppSelector(selectSubscriptions);

  const mqttConnect = () => {
    // if (connection.host) {
    setClient(
      mqtt.connect('ws://broker.emqx.io:8083/mqtt', { clientId: uuidv4() }),
    );
    // }
  }

  useEffect(() => {
    if (client) {

      client.on('connect', () => {
        dispatch(setStatus('Connected'));
        toast.success('Connected');

        setTimeout(() => {
          subscriptions.forEach((subscription) => {
            console.log(subscription.topic);
            mqttSubscribe(subscription);
          });
        }, 1000);

      });

      client.on('error', (err) => {
        toast.error(`Connection error: ${err.message}`);
        dispatch(setStatus('Disconnected'));
      });

      client.on('reconnect', () => {
        dispatch(setStatus('Disconnected'));
        toast.error('Reconnecting...');
      });

      client.on('message', (topic, message, packet) => {

        const subscriptionItem: SubscriptionItem = {
          id: uuidv4(),
          date: new Date(),
          message: message.toString(),
          topic: topic,
          qos: packet.qos,
        }

        dispatch(addSubscriptionItem(subscriptionItem));

      });
    }
  }, [client]);

  const mqttDisconnect = () => {
    if (client) {
      try {
        client.end(false, () => {
          dispatch(setStatus('Disconnected'));
          toast.error('Disconnected');
        })
      } catch (error) {
        toast.error('Disconnected error: ' + error?.toString());
        return false;
      }

      return true;
    }
  }

  const mqttSubscribe = async (subscription: Subscription) => {
    if (client) {
      let isFinished = false

      client.subscribe(subscription.topic, {
        qos: subscription.qos == 0 ? 0 : subscription.qos == 1 ? 1 : 2,
      }, async (error, granted) => {
        if (error) {
          toast.error('Subscription error: ' + error.message);
          return false;
        } else if (![0, 1, 2].includes(granted[0].qos)) {
          toast.error('Subscribe failed: Unexpected QoS, please check MQTT broker ACL configuration');
          return false;
        }

        isFinished = true
      });

      const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
      await new Promise(async (resolve) => {
        while (!isFinished) {
          await sleep(100)
        }
        resolve(isFinished)
      });

    } else {
      toast.error('Client not connected');
      return false;
    }
  }

  const mqttUnSubscribe = (subscription: Subscription) => {
    if (client) {

      client.unsubscribe(subscription.topic, {
        qos: subscription.qos == 0 ? 0 : subscription.qos == 1 ? 1 : 2
      }, (error) => {
        if (error) {
          console.log('Unsubscribe error', error)
          return false;
        }
      });

      return true;
    } else {
      return true;
    }
  }

  return {
    mqttConnect,
    mqttDisconnect,
    mqttSubscribe,
    mqttUnSubscribe,
  };
}
