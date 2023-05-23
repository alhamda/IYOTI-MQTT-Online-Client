import { SubscriptionItem } from "@/models/Subscription";
import ReactJson from "rc-json-view";

export default function SubscriptionBubble({ subscriptionItem }: { subscriptionItem: SubscriptionItem }) {

  function isJsonString(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  return (
    <div className="mb-6">
      <div className="w-min min-w-[25rem] bg-white rounded-lg rounded-tl-none border max-w-[70%]">
        <div className="pt-4 px-4 flex items-center">
          <div className="text-xs w-full text-gray-500 line-clamp-1 break-all">Topic: {subscriptionItem.topic}</div>
          <div className="ml-2 text-xs text-gray-500 flex-shrink-0">QoS: {subscriptionItem.qos}</div>
        </div>
        <div className="p-4 pt-3">
          {isJsonString(subscriptionItem.message) ?
            <ReactJson src={JSON.parse(subscriptionItem.message)}
              name={null}
              enableClipboard={false}
              showComma={true}
              displayObjectSize={false}
              displayDataTypes={false}
            /> : subscriptionItem.message}
        </div>
      </div>
      <span className="flex items-center text-xs text-gray-500 mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mr-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>

        12 September 2023 12:34:54:4343</span>
    </div>
  )
}
