import Required from "@/components/UI/Required";

export default function AdvancedConnection() {
  return (
    <div className="max-w-6xl mx-auto py-10 w-full">
      <div className="bg-white shadow-lg rounded-t-md border-b">
        <div className="p-5 flex items-center justify-between space-x-5 border-b">
          <div className="text-lg flex items-center space-x-2">
            <button className="hover:bg-gray-100 rounded-md p-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
              </svg>
            </button>
            <div className="font-semibold">Back</div>
          </div>
          <div className="flex items-center space-x-4 shrink-0">
            <button className="flex w-full items-center justify-center flex-grow-0 px-4 py-2.5 text-white transition-colors duration-200 bg-emerald-500 rounded-md hover:bg-emerald-600 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
              Connect
            </button>
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-3 gap-y-3 gap-x-5">
            <div>
              <label className="block mb-3 text-sm text-gray-700">
                Host <Required />
              </label>

              <input type="text" className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40" />
            </div>

            <div>
              <label className="block mb-3 text-sm text-gray-700">
                Port <Required />
              </label>

              <input type="number" className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40" />
            </div>

            <div>
              <label className="block mb-3 text-sm text-gray-700">
                Client ID <Required />
              </label>

              <div className="flex">

                <input type="text" className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40 rounded-r-none" />

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

            <div>
              <label className="block mb-3 text-sm text-gray-700">
                Keep Alive
              </label>

              <input type="number" value="60" className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
