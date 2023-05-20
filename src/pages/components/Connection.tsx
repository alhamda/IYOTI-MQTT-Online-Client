import Required from "@/components/UI/Required";

export default function Connection() {
  return (
    <div className="bg-white shadow-md rounded-t-md border-b">
      <div className="p-5 font-semibold text-lg border-b">Connection</div>
      <div className="p-5">
        <div className="grid grid-cols-3 gap-y-3 gap-x-5">
          <div>
            <label className="block mb-3 text-sm text-gray-700">
              Name <Required />
            </label>

            <input type="text" className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40" />
          </div>

          <div>
            <label className="block mb-3 text-sm text-gray-700">
              Client ID <Required />
            </label>

            <input type="text" className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40" />
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
  )
}
