
export default function Publish() {
  return (
    <>
      <div className="flex flex-row">
        <input type="text" className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400  border border-transparent focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40" placeholder="Topic" />
        <div className="flex items-center px-3 text-gray-700">
          <span>QoS:</span>
          <select className="ml-2 block w-full px-4 py-2 text-gray-700 placeholder-gray-400  border border-transparent focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40 min-w-[70px]">
            <option selected>0</option>
            <option>1</option>
            <option>2</option>
          </select>
        </div>
        <button className="font-medium flex px-4 border border-emerald-500 hover:border-emerald-600 hover:bg-emerald-600 transition-all bg-emerald-500 text-white items-center justify-center text-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
          <span>Publish</span>
        </button>
      </div>
      <div className="flex border-t">
        <textarea autoComplete="off" className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-transparent focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40 min-h-[150px] max-h-[200px]" placeholder="Message" rows={5} />
      </div>
    </>
  )
}
