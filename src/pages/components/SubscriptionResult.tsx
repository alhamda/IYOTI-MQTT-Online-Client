import AlwaysScrollToBottom from '@/components/UI/AlwaysScrollToBottom';
import SubscriptionBubble from '@/components/UI/SubscriptionBubble';
import { Subscription } from '@/models/Subscription';
import { useAppSelector } from '@/redux/hooks';
import { selectSetting, selectSubscriptionItems, selectSubscriptions } from '@/redux/slices/mqttSlice';
import { matchTopicMethod } from '@/utils/topicMatch';
import { useEffect } from 'react'

export default function SubscriptionResult({
  subscription,
  setSubscription,
}: {
  subscription: Subscription | null,
  setSubscription: React.Dispatch<React.SetStateAction<Subscription | null>>,
}) {

  const setting = useAppSelector(selectSetting);
  const subscriptions = useAppSelector(selectSubscriptions);
  const subscriptionItems = useAppSelector(selectSubscriptionItems);

  const subscriptionItemsData = subscriptionItems.filter((item) => {
    if (!subscription) return true;
    return matchTopicMethod(subscription?.topic ?? '', item.topic);
  });

  useEffect(() => {
    if (subscriptionItemsData.length == 0 && subscriptions.length == 0) setSubscription(null);
  }, [subscriptionItemsData, subscriptions])

  return (
    <>
      {subscriptionItemsData.map((item) => {
        return <SubscriptionBubble key={item.id} subscriptionItem={item} />;
      })}

      {(subscriptionItemsData.length > 0 && setting.autoScroll) && <AlwaysScrollToBottom />}

      {subscriptionItemsData.length == 0 && <div className="flex w-full h-full items-center justify-center flex-col">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-gray-400/70">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="hidden w-20 h-20 text-gray-400/70">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>

        <div className="mt-4 font-medium text-xl text-gray-400/70">No Data Received</div>
        <div className="mt-2 text-gray-400/70">Please select or create new subscription</div>
      </div>}
    </>
  )
}
