import { Subscription } from "@/models/Subscription";
import { useAppDispatch } from "@/redux/hooks";
import { removeSubscription } from "@/redux/slices/mqttSlice";
import clsx from "clsx";

export default function SubscriptionItem({
  subscription,
  isSelected,
  onClick,
}: {
  subscription: Subscription,
  isSelected: boolean
  onClick: any
}) {
  const dispatch = useAppDispatch();
  
  function remove(){
    dispatch(removeSubscription(subscription));
  }

  return (
    <div className={clsx('transition-all group cursor-pointer flex items-center justify-between space-x-5 p-3 border-b w-full border-r-[2.5px]', isSelected ? 'border-r-emerald-500 text-emerald-500 font-medium bg-emerald-50/30 hover:bg-emerald-50/30' : 'hover:bg-slate-50 text-slate-600 border-r-transparent')} onClick={onClick}>
      <div className="relative flex flex-col space-y-1 px-2 group">
        <div className="line-clamp-1 break-all text-sm">{subscription.topic}</div>
        <div className="text-gray-400 flex-shrink-0 text-xs font-normal">Qos {subscription.qos}</div>
      </div>
      <div onClick={remove} className="transition-all hidden group-hover:block text-red-500 hover:text-red-600">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
  )
}
