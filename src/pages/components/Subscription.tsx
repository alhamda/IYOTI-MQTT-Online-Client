import SubscriptionItem from "@/components/UI/SubscriptionItem";
import Result from "@/pages/components/Result";

export default function Subscription() {
  return (
    <div className="bg-white shadow-md rounded-b-md">
      <div className="flex flex-row max-h-[700px]">
        <div className="flex flex-col min-w-[270px] max-h-full">

          <div className="border-b p-5">
            <button className="flex w-full items-center justify-center flex-grow-0 px-4 py-2.5 text-white transition-colors duration-200 bg-emerald-500 rounded-md hover:bg-emerald-600 focus:outline-none">
              + Subscription Baru
            </button>
          </div>

          <div className="p-5 space-y-3.5 overflow-y-auto">
            <SubscriptionItem />
            <SubscriptionItem />
            <SubscriptionItem />
            <SubscriptionItem />
            <SubscriptionItem />
            <SubscriptionItem />
            <SubscriptionItem />
            <SubscriptionItem />
            <SubscriptionItem />
            <SubscriptionItem />
            <SubscriptionItem />
            <SubscriptionItem />
            <SubscriptionItem />
          </div>
        </div>
        <div className="flex w-full">
          <Result />
        </div>
      </div>
    </div>
  )
}
