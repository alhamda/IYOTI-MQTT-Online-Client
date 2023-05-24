import { PublishItem } from '@/models/Publish';
import { Subscription, SubscriptionItem } from '@/models/Subscription';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addPublish, addSubscription, addSubscriptionItem, pauseSubscription, resumeSubscription, selectConnection, selectSubscriptions, setStatus } from '@/redux/slices/mqttSlice';
import { parseQoS } from '@/utils/helper';
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
          subscriptions
            .filter(subscription => subscription.isPaused == false)
            .forEach((subscription) => {
              mqttSubscribe(subscription, false);
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
          retain: packet.retain,
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

  const mqttPauseSubscription = (subscription: Subscription) => {
    if (mqttUnSubscribe(subscription)) {
      dispatch(pauseSubscription(subscription));
    }
  }

  const mqttResumeSubscription = async (subscription: Subscription) => {
    await mqttSubscribe(subscription);
    dispatch(resumeSubscription(subscription));
  }

  const mqttSubscribe = async (subscription: Subscription, push?: boolean) => {
    if (client) {
      let isFinished = false;
      let isError = false;

      client.subscribe(subscription.topic, {
        qos: parseQoS(subscription.qos),
      }, async (error, granted) => {
        if (error) {
          toast.error('Subscription error: ' + error.message);
          isError = true;
          return false;
        } else if (Array.isArray(granted) && ![0, 1, 2].includes(granted[0]?.qos)) {
          toast.error('Subscribe failed: Unexpected QoS, please check MQTT broker ACL configuration');
          isError = true;
          return false;
        }

        isFinished = true
        if (!isError && push) {
          dispatch(addSubscription(subscription));
        }
      });

      const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
      await new Promise(async (resolve) => {
        while (!isFinished) {
          await sleep(100)
        }
        resolve(isFinished)
      });

    } else {
      if(push) toast.error('Client not connected');
      return false;
    }
  }

  const mqttUnSubscribe = (subscription: Subscription) => {
    if (client) {

      client.unsubscribe(subscription.topic, {
        qos: parseQoS(subscription.qos)
      }, (error) => {
        if (error) {
          return false;
        }
      });

      return true;
    } else {
      return true;
    }
  }

  const mqttPublish = (publish: PublishItem) => {
    if (client) {
      client.publish(publish.topic, publish.message, { qos: publish.qos == 0 ? 0 : publish.qos == 1 ? 1 : 2, retain: publish.retain }, (error) => {
        if (error) {
          toast.error('Publish error: ' + error.message);
        } else {
          dispatch(addPublish(publish));
        }
      })
    } else {
      toast.error('Client not connected');
    }
  }

  return {
    mqttConnect,
    mqttDisconnect,
    mqttSubscribe,
    mqttUnSubscribe,
    mqttPublish,
    mqttPauseSubscription,
    mqttResumeSubscription,
  };
}
