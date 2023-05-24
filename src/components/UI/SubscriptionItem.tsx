import useMqtt from "@/hooks/useMqtt";
import { Subscription } from "@/models/Subscription";
import { useAppDispatch } from "@/redux/hooks";
import { removeSubscription } from "@/redux/slices/mqttSlice";
import clsx from "clsx";

export default function SubscriptionItem({
  subscription,
  isSelected,
  onClick,
  mqttClient,
}: {
  subscription: Subscription,
  isSelected: boolean
  onClick: any,
  mqttClient: any,
}) {
  const dispatch = useAppDispatch();

  function remove() {
    let unsubscribe = mqttClient.mqttUnSubscribe(subscription);
    if (unsubscribe) dispatch(removeSubscription(subscription));
  }

  function resume() {
    mqttClient.mqttResumeSubscription(subscription);
  }

  function pause() {
    mqttClient.mqttPauseSubscription(subscription);
  }

  return (
    <div className={clsx('transition-all group cursor-pointer flex items-center justify-between space-x-5 p-3 border-b w-full border-r-[2.5px]',
      (isSelected && !subscription.isPaused) && 'border-r-emerald-500 text-emerald-500 font-medium bg-emerald-50/30 hover:bg-emerald-50/30',
      (isSelected && subscription.isPaused) && '!font-medium border-r-amber-500',
      subscription.isPaused && 'font-normal border-r-transparent text-amber-500 bg-amber-50/30 hover:bg-amber-50/30',
      !isSelected && !subscription.isPaused && 'hover:bg-slate-50 text-slate-600 border-r-transparent')}
      onClick={onClick}>
      <div className="relative flex flex-col space-y-1 px-2 group">
        <div className="line-clamp-1 break-all text-sm">{subscription.topic}</div>
        <div className="text-gray-400 flex-shrink-0 text-xs font-normal">Qos {subscription.qos}</div>
      </div>
      <div className="items-center shrink-0 transition-all hidden group-hover:flex space-x-0.5">
        {subscription.isPaused && <svg onClick={resume} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[25px] h-[25px] text-emerald-500 hover:text-emerald-600 ">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
        </svg>
        }

        {!subscription.isPaused && <svg onClick={pause} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[25px] h-[25px] text-amber-500 hover:text-amber-600 ">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        }

        <svg onClick={remove} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[25px] h-[25px] text-red-500 hover:text-red-600 ">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
  )
}
