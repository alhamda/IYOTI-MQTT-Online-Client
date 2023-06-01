import { PublishItem } from '@/models/Publish';
import { Subscription, SubscriptionItem } from '@/models/Subscription';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Connection, addPublish, addSubscription, addSubscriptionItem, pauseSubscription, resumeSubscription, selectStatus, selectSubscriptions, setStatus } from '@/redux/slices/mqttSlice';
import { parseQoS } from '@/utils/helper';
import mqtt, { MqttClient } from 'precompiled-mqtt';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

export default function useMqtt() {
  const dispatch = useAppDispatch();

  const [client, setClient] = useState<MqttClient | null>(null);
  const subscriptions = useAppSelector(selectSubscriptions);
  const connectionStatus = useAppSelector(selectStatus);

  const mqttConnect = (connection: Connection) => {

    if (connection) {
      dispatch(setStatus('Connecting'));

      let options: mqtt.IClientOptions = {
        clientId: connection.clientId,
        username: connection.username,
        password: connection.password,
        clean: connection.cleanSession,
        rejectUnauthorized: connection.sslTls,
        keepalive: connection.keepAlive,
        reconnectPeriod: 3000,
      };

      if (connection.lastWill && connection.lastWillTopic) {
        options.will = {
          topic: connection.lastWillTopic,
          payload: connection.lastWillMessage ?? '',
          qos: parseQoS(+(connection.lastWillQos ?? 0)),
          retain: connection.lastWillRetain ?? false,
        }
      }

      let path: string = '/mqtt';

      let protocol = connection.sslTls ? 'wss://' : 'ws://';
      let url = protocol + connection.host + ':' + connection.port + path;

      setClient(mqtt.connect(url, options));
    }

  }

  useEffect(() => {
    if (client) {

      client.on('connect', () => {
        dispatch(setStatus('Connected'));
        toast.success('Connected');

        subscriptions
          .filter(subscription => !subscription.isPaused)
          .forEach((subscription) => {
            mqttSubscribe(subscription, false);
          });

      });

      client.on('error', (err) => {
        toast.error(`${err.message}`);
        dispatch(setStatus('Disconnected'));
        client.end();
        setClient(null);
      });

      client.on('reconnect', () => {
        dispatch(setStatus('Connecting'));

        const toastId = toast.loading('Reconnecting', {
          iconTheme: {
            primary: '#FDC426',
            secondary: '#F4F4F4',
          }
        });
        setTimeout(() => {
          toast.dismiss(toastId);
        }, 2000);

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
      dispatch(setStatus('Disconnecting'));
      try {
        client.end(true, () => {
          dispatch(setStatus('Disconnected'));
          toast.error('Disconnected');
        });

        setClient(null);
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
    if (connectionStatus == 'Connected') await mqttSubscribe(subscription);
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
      if (push) toast.error('Client not connected');
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
      client.publish(publish.topic, publish.message, { qos: parseQoS(publish.qos), retain: publish.retain }, (error) => {
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
    setClient,
    mqttConnect,
    mqttDisconnect,
    mqttSubscribe,
    mqttUnSubscribe,
    mqttPublish,
    mqttPauseSubscription,
    mqttResumeSubscription,
  };
}
