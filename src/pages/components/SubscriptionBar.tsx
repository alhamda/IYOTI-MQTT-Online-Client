import SubscriptionItem from "@/components/UI/SubscriptionItem";
import { Subscription } from "@/models/Subscription";
import SubscriptionModal from "@/pages/components/SubscriptionModal";
import { useAppSelector } from "@/redux/hooks";
import { selectSubscriptions } from "@/redux/slices/mqttSlice";
import { useState } from "react";

export default function SubscriptionBar({
  mqttClient,
  subscription,
  setSubscription,
}: {
  mqttClient: any,
  subscription: Subscription | null,
  setSubscription: React.Dispatch<React.SetStateAction<Subscription | null>>,
}) {
  const subscriptions = useAppSelector(selectSubscriptions);

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <SubscriptionModal mqttClient={mqttClient} isOpen={showModal} setIsOpen={setShowModal} />}
      <div className="flex flex-col lg:min-w-[270px]">

        <div className="border-b p-5 bg-white lg:z-10 lg:sticky lg:-top-1">
          <button onClick={() => setShowModal(true)} className="font-medium border flex w-full items-center justify-center flex-grow-0 px-4 py-2.5 transition-colors duration-200 bg-gray-100 rounded-md hover:bg-gray-200 hover:border-bg:gray-200 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            New Subscription
          </button>
        </div>

        <div className="overflow-y-auto">
          {subscriptions.map((item) => {
            return <SubscriptionItem
              mqttClient={mqttClient}
              key={item.id}
              subscription={item}
              onClick={() => setSubscription(item)}
              isSelected={subscription?.id == item.id}
            />;
          })}
        </div>
      </div>
    </>
  )
}
