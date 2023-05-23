import SubscriptionBubble from "@/components/UI/SubscriptionBubble";
import SubscriptionItem from "@/components/UI/SubscriptionItem";
import Publish from "@/pages/components/Publish";
import SubscriptionModal from "@/pages/components/SubscriptionModal";
import { useAppSelector } from "@/redux/hooks";
import { selectSubscriptionItems, selectSubscriptions } from "@/redux/slices/mqttSlice";
import { useState } from "react";

export default function Subscription() {

  const subscriptions = useAppSelector(selectSubscriptions);
  const subscriptionItems = useAppSelector(selectSubscriptionItems);

  const [subscriptionId, setSubscriptionId] = useState<string>('');
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <SubscriptionModal isOpen={showModal} setIsOpen={setShowModal} />}
      <div className="bg-white shadow-lg">
        <div className="flex flex-row max-h-[850px]">
          <div className="flex flex-col min-w-[270px] max-h-full">

            <div className="border-b p-5">
              <button onClick={() => setShowModal(true)} className="font-medium border flex w-full items-center justify-center flex-grow-0 px-4 py-2.5 transition-colors duration-200 bg-gray-100 rounded-md hover:bg-gray-200 hover:border-bg:gray-200 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                New Subscription
              </button>
            </div>

            <div className="overflow-y-auto">
              {subscriptions.map((subscription) => {
                return <SubscriptionItem
                  key={subscription.id}
                  subscription={subscription}
                  onClick={() => setSubscriptionId(subscription.id)}
                  isSelected={subscriptionId == subscription.id}
                />;
              })}
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex flex-col h-full w-full border border-t-0 border-b-0">
              <div className="p-3 px-5 border-b flex justify-between">
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center">
                    <input id="autoJson" type="checkbox" className="w-3.5 h-3.5 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-0 focus:ring-transparent" />
                    <label htmlFor="autoJson" className="ml-2 text-xs">Auto format JSON</label>
                  </div>
                  <div className="flex items-center">
                    <input id="autoScroll" type="checkbox" className="w-3.5 h-3.5 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-0 focus:ring-transparent" />
                    <label htmlFor="autoScroll" className="ml-2 text-xs">Auto scroll</label>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-xs">
                  <div className="cursor-pointer text-emerald-500">Received</div>
                  <div className="cursor-pointer text-gray-500 hover:text-gray-800">Published</div>
                </div>
              </div>
              <div className="p-5 h-full w-full overflow-y-auto bg-gray-100 min-h-[500px] max-h-full">
                {subscriptionItems.filter((item) => item.subscriptionId == subscriptionId).map((item) => {
                  return <SubscriptionBubble key={item.id} subscriptionItem={item} />;
                })}

                {subscriptionItems.length == 0 && <div className="flex w-full h-full items-center justify-center flex-col">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="hidden w-20 h-20 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  </svg>

                  <div className="mt-4 font-medium text-xl text-gray-400">No Data Received</div>
                  <div className="mt-2 text-gray-400">Please select or create new subscription</div>
                </div>}
              </div>
              <div className="bg-white w-full border-t rounded-br-md">
                <Publish />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
