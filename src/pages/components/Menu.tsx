import { Subscription } from "@/models/Subscription";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearPublishedHistory, clearSubscriptionHistory, selectSetting, setSetting } from "@/redux/slices/mqttSlice";
import clsx from "clsx";

export default function Menu({
  tab,
  setTab,
  subscription
}: {
  tab: 'Received' | 'Published',
  setTab: React.Dispatch<React.SetStateAction<"Received" | "Published">>,
  subscription: Subscription | null,
}) {

  const dispatch = useAppDispatch();
  const setting = useAppSelector(selectSetting);

  return (
    <div className="p-3 px-5 border-b flex justify-between bg-white sticky -top-1 z-10">
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center">
          <input id="autoJson" type="checkbox" className="w-3.5 h-3.5 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-0 focus:ring-transparent" checked={setting.autoJson} onChange={(e) => {
            dispatch(setSetting({
              autoJson: e.target.checked
            }));
          }} />
          <label htmlFor="autoJson" className="ml-2 text-xs">Highlight JSON</label>
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

        <div onClick={() => {
          if(tab == 'Received') dispatch(clearSubscriptionHistory(subscription));
          if(tab == 'Published') dispatch(clearPublishedHistory(subscription))
        }} className="flex items-center cursor-pointer text-gray-500 hover:text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg> Clear History</div>

        <div className="border-r text-white">|</div>

        <div onClick={() => setTab('Received')} className={
          clsx(`cursor-pointer text-emerald-500`, tab == 'Received' ? 'text-emerald-500' : 'text-gray-500 hover:text-gray-800')
        }>Received</div>

        <div onClick={() => setTab('Published')} className={
          clsx(`cursor-pointer text-emerald-500`, tab == 'Published' ? 'text-emerald-500' : 'text-gray-500 hover:text-gray-800')
        }>Published</div>
      </div>
    </div>
  )
}
