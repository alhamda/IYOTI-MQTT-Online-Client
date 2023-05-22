import SubscriptionBubble from "@/components/UI/SubscriptionBubble";
import Publish from "@/pages/components/Publish";

export default function Result() {
  return (
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
        <SubscriptionBubble text="Halo nama saya Alhamda Adisoka" />
        <SubscriptionBubble text="Halo nama saya Alhamda Adisoka" />
        <SubscriptionBubble text={`{"VD158":-2.3398438,"VD154":1.125,"VD170":40.5,"VD162":53.8,"VD166":39.2,"VD150":0.2265625,"VD174":31.7,"VD178":43.23047,"I0.0":0,"I2.5":0,"I2.6":1,"I2.7":0,"M1.0":0,"M1.1":1,"I2.0":1,"I0.3":0,"I0.4":0,"I0.7":0,"I1.0":0,"I1.1":0,"I1.2":0,"I1.3":0,"I1.4":0,"I1.5":0,"I1.6":0,"M1.2":0,"M5.5":0,"M1.3":0,"M5.6":0,"I2.1":0,"I2.2":0,"I2.3":0,"I0.1":0,"I0.2":0,"ts":"2023-05-21T09:02:57.0914187+08:00"}`} />
        <SubscriptionBubble text="Halo nama saya Alhamda Adisoka" />
        <SubscriptionBubble text="Halo nama saya Alhamda Adisoka" />
        <SubscriptionBubble text="Halo nama saya Alhamda Adisoka" />
      </div>
      <div className="bg-white w-full border-t rounded-br-md">
        <Publish />
      </div>
    </div>
  )
}
