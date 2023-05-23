import SubscriptionBubble from "@/components/UI/SubscriptionBubble";
import SubscriptionItem from "@/components/UI/SubscriptionItem";
import Publish from "@/pages/components/Publish";
import SubscriptionModal from "@/pages/components/SubscriptionModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearHistory, selectSetting, selectSubscriptionItems, selectSubscriptions, setSetting } from "@/redux/slices/mqttSlice";
import { useEffect, useRef, useState } from "react";

const AlwaysScrollToBottom = () => {
  const elementRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => elementRef.current?.scrollIntoView({ behavior: "smooth" }));
  return <div ref={elementRef} />;
};

export default function Subscription({ mqttClient }: { mqttClient: any }) {

  const dispatch = useAppDispatch();
  const setting = useAppSelector(selectSetting);

  const subscriptions = useAppSelector(selectSubscriptions);
  const subscriptionItems = useAppSelector(selectSubscriptionItems);

  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <SubscriptionModal mqttClient={mqttClient} isOpen={showModal} setIsOpen={setShowModal} />}
      <div className="bg-white shadow-lg">
        <div className="flex flex-row max-h-[870px]">
          <div className="flex flex-col min-w-[270px]">

            <div className="border-b p-5 bg-white z-10 sticky -top-1">
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
                  mqttClient={mqttClient}
                  key={subscription.id}
                  subscription={subscription}
                  onClick={() => setSubscriptionId(subscription.id)}
                  isSelected={subscriptionId == subscription.id}
                />;
              })}
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex flex-col h-full w-full border border-r-0 border-t-0 border-b-0">
              <div className="p-3 px-5 border-b flex justify-between bg-white sticky -top-1 z-10">
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center">
                    <input id="autoJson" type="checkbox" className="w-3.5 h-3.5 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-0 focus:ring-transparent" checked={setting.autoJson} onChange={(e) => {
                      dispatch(setSetting({
                        autoJson: e.target.checked
                      }));
                    }} />
                    <label htmlFor="autoJson" className="ml-2 text-xs">Auto format JSON</label>
                  </div>
                  <div className="flex items-center">
                    <input id="autoScroll" type="checkbox" className="w-3.5 h-3.5 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-0 focus:ring-transparent"
                      checked={setting.autoScroll} onChange={(e) => {
                        dispatch(setSetting({
                          autoScroll: e.target.checked
                        }));
                      }} />
                    <label htmlFor="autoScroll" className="ml-2 text-xs">Auto scroll</label>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-xs">
                  <div onClick={() => dispatch(clearHistory(subscriptionId))} className="flex items-center cursor-pointer text-gray-500 hover:text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg> Clear History</div>
                  <div className="border-r text-white">|</div>
                  <div className="cursor-pointer text-emerald-500">Received</div>
                  <div className="cursor-pointer text-gray-500 hover:text-gray-800">Published</div>
                </div>
              </div>
              <div className="p-5 h-full w-full overflow-y-auto bg-gray-100 min-h-[500px] max-h-full">
                {subscriptionItems.filter((item) => {
                  if (subscriptionId) {
                    return item.subscriptionId == subscriptionId;
                  } else {
                    return true;
                  }
                }).map((item) => {
                  return <SubscriptionBubble key={item.id} subscriptionItem={item} />;
                })}

                {(subscriptionItems.length > 0 && setting.autoScroll) && <AlwaysScrollToBottom />}

                {subscriptionItems.length == 0 && <div className="flex w-full h-full items-center justify-center flex-col">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-gray-400/70">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="hidden w-20 h-20 text-gray-400/70">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  </svg>

                  <div className="mt-4 font-medium text-xl text-gray-400/70">No Data Received</div>
                  <div className="mt-2 text-gray-400/70">Please select or create new subscription</div>
                </div>}
              </div>
              <div className="bg-white w-full border-t rounded-br-md">
                <Publish mqttClient={mqttClient} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
