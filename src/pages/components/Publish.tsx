import { useState } from 'react';
import Editor from '@monaco-editor/react';
import toast from 'react-hot-toast';
import { PublishItem } from '@/models/Publish';
import { useAppSelector } from '@/redux/hooks';
import { selectStatus } from '@/redux/slices/mqttSlice';

const monacoOptions = {
  readOnly: false,
  minimap: { enabled: false },
  renderValidationDecorations: 'off',
  renderLineHighlight: 'none',
  lineNumbers: 'off',
  glyphMargin: false,
  folding: false,
  lineDecorationsWidth: 0,
  lineNumbersMinChars: 0
};

export default function Publish({ mqttClient }: { mqttClient: any }) {

  let defaultMessage = `{\n\t"greeting": "Hello!"\n}`;

  const connectionStatus = useAppSelector(selectStatus);
  const [topic, setTopic] = useState<string>('');
  const [qos, setQos] = useState<string>('0');
  const [message, setMessage] = useState<string | undefined>(defaultMessage);

  const handleEditorOnChange = (
    value: string | undefined
  ) => {
    setMessage(value);
  };

  const doPublish = () => {
    if (topic && message) {

      let publishItem: PublishItem = {
        topic,
        message,
        qos: +qos,
        retain: false,
        date: new Date(),
      }

      mqttClient.mqttPublish(publishItem);
    } else {
      toast.error('Please type topic and payload');
    }
  }

  return (
    <>
      <div className="flex flex-row">
        <input onChange={(e) => setTopic(e.target.value)} value={topic} type="text" className="text-sm bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400  border border-transparent focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40" placeholder="Topic" />
        <div className="flex items-center px-3 text-gray-700">
          <span>QoS:</span>
          <select value={qos} onChange={(e) => setQos(e.target.value)} className="ml-2 block w-full px-4 py-2 text-gray-700 placeholder-gray-400  border border-transparent focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40 min-w-[70px]">
            <option>0</option>
            <option>1</option>
            <option>2</option>
          </select>
        </div>
        <button onClick={doPublish} disabled={(connectionStatus == 'Connected' && message && topic) ? false : true} className="font-medium flex px-4 border border-emerald-500 hover:border-emerald-600 hover:bg-emerald-600 transition-all bg-emerald-500 text-white items-center justify-center text-center disabled:bg-gray-300 disabled:border-transparent disabled:cursor-not-allowed">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
          <span>Publish</span>
        </button>
      </div>
      <div className="relative flex border-t">
        <Editor
          className='pt-3 pl-[1.05rem] text-gray-700 placeholder-gray-400 border border-transparent focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40'
          height="180px"
          defaultValue={message}
          options={monacoOptions}
          defaultLanguage="json"
          onChange={handleEditorOnChange}
        />
      </div>
    </>
  )
}
