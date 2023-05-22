import SubscriptionItem from "@/components/UI/SubscriptionItem";
import Result from "@/pages/components/Result";
import { useState } from "react";

export default function Subscription() {

  const [subscriptionId, setSubscriptionId] = useState<string>('');

  return (
    <div className="bg-white shadow-lg">
      <div className="flex flex-row max-h-[850px]">
        <div className="flex flex-col min-w-[270px] max-h-full">

          <div className="border-b p-5">
            <button className="font-medium border flex w-full items-center justify-center flex-grow-0 px-4 py-2.5 transition-colors duration-200 bg-gray-100 rounded-md hover:bg-gray-200 hover:border-bg:gray-200 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              New Subscription
            </button>
          </div>

          <div className="overflow-y-auto">
            <SubscriptionItem 
              onClick={() => setSubscriptionId('1')} 
              isSelected={subscriptionId == '1'} 
            />
            <SubscriptionItem 
              onClick={() => setSubscriptionId('2')} 
              isSelected={subscriptionId == '2'} 
            />
            <SubscriptionItem 
              onClick={() => setSubscriptionId('3')} 
              isSelected={subscriptionId == '3'} 
            />
            <SubscriptionItem 
              onClick={() => setSubscriptionId('4')} 
              isSelected={subscriptionId == '4'} 
            />
          </div>
        </div>
        <div className="flex w-full">
          <Result />
        </div>
      </div>
    </div>
  )
}
