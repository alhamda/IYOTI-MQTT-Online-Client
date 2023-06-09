import { useState } from 'react';
import Editor from '@monaco-editor/react';
import toast from 'react-hot-toast';
import { PublishItem } from '@/models/Publish';
import { useAppSelector } from '@/redux/hooks';
import { selectStatus } from '@/redux/slices/mqttSlice';
import { v4 as uuidv4 } from 'uuid';

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

  let defaultMessage = `{\n\t"greeting": "Hello world!"\n}`;

  const connectionStatus = useAppSelector(selectStatus);
  const [topic, setTopic] = useState<string>('');
  const [qos, setQos] = useState<string>('0');
  const [retain, setRetain] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>(defaultMessage);

  const handleEditorOnChange = (
    value: string | undefined
  ) => {
    setMessage(value);
  };

  const doPublish = () => {
    if (topic && message) {

      let publishItem: PublishItem = {
        id: uuidv4(),
        topic,
        message,
        retain,
        qos: +qos,
        date: new Date(),
      }

      mqttClient.mqttPublish(publishItem);
    } else {
      toast.error('Please type topic and payload');
    }
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <input onChange={(e) => setTopic(e.target.value)} value={topic} type="text" className="text-sm bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400  border border-transparent focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40" placeholder="Topic" />

        <div className='flex border-t lg:border-none'>
          <div className="flex items-center px-3 pr-0 text-gray-700">
            <span>QoS:</span>
            <select value={qos} onChange={(e) => setQos(e.target.value)} className="ml-2 block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-transparent focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40 min-w-[70px]">
              <option>0</option>
              <option>1</option>
              <option>2</option>
            </select>
          </div>
          <div className="flex items-center px-3 text-gray-700">
            <input id="retain" type="checkbox" className="w-3.5 h-3.5 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-0 focus:ring-transparent"
              checked={retain} onChange={(e) => {
                setRetain(e.target.checked);
              }} />
            <label htmlFor="retain" className="ml-2 mr-1">Retain</label>
          </div>
        </div>

        <button onClick={doPublish} disabled={(connectionStatus == 'Connected' && message && topic) ? false : true} className="font-medium flex px-4 py-2 lg:py-0 border border-emerald-500 hover:border-emerald-600 hover:bg-emerald-600 transition-all bg-emerald-500 text-white items-center justify-center text-center disabled:bg-gray-300 disabled:border-transparent disabled:cursor-not-allowed">
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
