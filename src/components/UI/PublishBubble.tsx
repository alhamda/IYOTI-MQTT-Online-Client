import { PublishItem } from "@/models/Publish";
import { useAppSelector } from "@/redux/hooks";
import { selectSetting } from "@/redux/slices/mqttSlice";
import moment from "moment";
import SyntaxHighlighter from "react-syntax-highlighter";
import { xcode } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function PublishBubble({
  publish
}: {
  publish: PublishItem
}) {

  const setting = useAppSelector(selectSetting);

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
      <div className="bg-white rounded-md border">
        <div className="pt-4 px-4 flex items-center">
          <span className="text-xs w-full text-gray-500 line-clamp-1 break-all">Published Topic: {publish.topic}</span>
          {publish.retain && <span className="ml-2 mr-1 rounded-md bg-gray-200 px-2 py-1 text-xs text-gray-500 flex-shrink-0">Retain</span>}
          <span className="ml-2 text-xs text-gray-500 flex-shrink-0">QoS: {publish.qos}</span>
        </div>
        <div className="p-4 pt-3 break-all max-w-full overflow-hidden">
          {setting.autoJson && isJsonString(publish.message) ?
            <SyntaxHighlighter language="json" style={xcode} wrapLines={true} wrapLongLines={true} customStyle={{ width: '100%', overflow: 'hidden' }}>
              {publish.message}
            </SyntaxHighlighter> :
            <p className="break-all">{publish.message}</p>
          }
        </div>
      </div>
      <span className="flex items-center text-xs text-gray-500 mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mr-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>

        {moment(publish.date).format('DD MMMM YYYY HH:mm:ss:SSS')}</span>
    </div>
  )
}
