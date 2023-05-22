import { useState } from "react";
import Required from "@/components/UI/Required";
import clsx from "clsx";

export default function Connection() {

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [useLastWill, setUseLastWill] = useState<boolean>(false);

  return (
    <div className="bg-white shadow-lg rounded-t-md border-b">
      <div className="p-5 flex items-center justify-between space-x-5">
        <div className="text-lg flex flex-col space-y-0.5">
          <div className="flex items-center">
            <div className="font-semibold mb-0">MQTT Online Client</div>
            <div className="ml-2 text-xs text-gray-500">by <span className="text-sm text-emerald-600 hover:underline hover:cursor-pointer">iyoti</span></div>
          </div>
          <div className="flex items-center space-x-2 text-sm pt-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="font-normal text-gray-500">Connected</span>
          </div>
        </div>
        <div className="flex items-center space-x-4 shrink-0">
          {/* <button className="flex border flex-nowrap w-full items-center justify-center flex-grow-0 px-4 py-2.5 transition-colors duration-200 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg> Advanced
          </button> */}
          <button className="flex w-full items-center justify-center flex-grow-0 px-4 py-2.5 text-white transition-colors duration-200 bg-emerald-500 rounded-md hover:bg-emerald-600 focus:outline-none font-medium" onClick={() => setIsConnected(!isConnected)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
            </svg>
            Connect
          </button>
        </div>
      </div>
      <div className={clsx(`p-5 border-t`, isConnected ? 'hidden' : 'block')}>
        <div className="grid grid-cols-3 gap-y-3 gap-x-5">
          <div>
            <label className="block mb-3 text-sm text-gray-700">
              Host <Required />
            </label>

            <input type="text" className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40" value="free.mqtt.iyoti.id" />
          </div>

          <div>
            <label className="block mb-3 text-sm text-gray-700">
              Port <Required />
            </label>

            <input type="number" className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40" value="8083" />
          </div>

          <div>
            <label className="block mb-3 text-sm text-gray-700">
              Client ID <Required />
            </label>

            <div className="flex">

              <input type="text" className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40 rounded-r-none" value="mqtt_iyoti_df343df2431" />

              <button className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>

              </button>
            </div>
          </div>

          <div>
            <label className="block mb-3 text-sm text-gray-700">
              Username
            </label>

            <input type="text" className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40" />
          </div>

          <div>
            <label className="block mb-3 text-sm text-gray-700">
              Password
            </label>

            <input type="password" className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40" />
          </div>

          <div className="flex space-x-5 items-start">
            <div>
              <label className="block mb-3 text-sm text-gray-700">
                Keep Alive
              </label>
              <input type="number" value="60" className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40" />
            </div>
            <div className="mt-2 flex flex-col w-full items-end space-y-0.5">
              <div className="w-full flex items-center">
                <input id="cleanSession" type="checkbox" className="w-3.5 h-3.5 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-0 focus:ring-transparent" />
                <label htmlFor="cleanSession" className="ml-2 text-sm">Clean Session</label>
              </div>
              <div className="w-full flex items-center">
                <input id="ssl" type="checkbox" className="w-3.5 h-3.5 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-0 focus:ring-transparent" />
                <label htmlFor="ssl" className="ml-2 text-sm">SSL/TLS</label>
              </div>
              <div className="w-full flex items-center">
                <input id="lastWill" type="checkbox" className="w-3.5 h-3.5 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-0 focus:ring-transparent" onChange={(e) => setUseLastWill(e.target.checked)} />
                <label htmlFor="lastWill" className="ml-2 text-sm">Last Will and Testament</label>
              </div>
            </div>
          </div>
        </div>
        <div className={clsx(`grid grid-cols-3 gap-y-3 gap-x-5 mt-5`, useLastWill ? '' : 'hidden')}>
          <div className="col-span-2">
            <label className="block mb-3 text-sm text-gray-700">
              Last-Will Topic
            </label>

            <input type="text" className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40" />
          </div>

          <div className="flex space-x-5 items-center">
            <div className="w-full">
              <label className="block mb-3 text-sm text-gray-700">
                Last-Will QoS
              </label>

              <select className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40">
                <option>0</option>
                <option>1</option>
                <option>2</option>
              </select>
            </div>
            <div className="w-full">
              <div>
                <label className="block mb-3 text-sm text-gray-700">
                  Last-Will Retain
                </label>

                <select className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40">
                  <option>False</option>
                  <option>True</option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-span-3">
            <label className="block mb-3 text-sm text-gray-700">
              Last-Will Message
            </label>

            <textarea rows={4} className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40" />
          </div>
        </div>

      </div>
    </div>
  )
}
