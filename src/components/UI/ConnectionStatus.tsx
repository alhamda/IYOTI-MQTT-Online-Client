import { useAppSelector } from '@/redux/hooks';
import { selectStatus } from '@/redux/slices/mqttSlice';
import clsx from 'clsx';

export default function ConnectionStatus() {
  const connectionStatus = useAppSelector(selectStatus);

  return (
    <>
      <span className="relative flex h-3 w-3">
        <span className={clsx(`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75`, connectionStatus == 'Connected' ? 'bg-green-500' : 'bg-red-500')}></span>
        <span className={clsx(`relative inline-flex rounded-full h-3 w-3`, connectionStatus == 'Connected' ? 'bg-green-500' : 'bg-red-500')}></span>
      </span>
      <span className="font-normal text-gray-500">{connectionStatus}</span></>
  )
}
