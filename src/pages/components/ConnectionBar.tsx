import { useState } from "react";
import Required from "@/components/UI/Required";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import { Connection, selectConnection, selectStatus, setConnection } from "@/redux/slices/mqttSlice";
import { z } from "zod";
import { withZodSchema } from 'formik-validator-zod'
import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik';
import { generateRandomClientId } from "@/utils/helper";
import ConnectionStatus from "@/components/UI/ConnectionStatus";

export default function ConnectionBar({ mqttClient }: { mqttClient: any }) {

  const dispatch = useDispatch();

  const connection = useAppSelector(selectConnection);
  const connectionStatus = useAppSelector(selectStatus);

  const [connectionForm, setConnectionForm] = useState<boolean>(true);
  const [protocol, setProtocol] = useState<string>(connection.sslTls ? 'wss://' : 'ws://');

  const formSchema = z.object({
    host: z.string().min(1, 'Required').trim(),
    port: z.number({ required_error: 'Required', invalid_type_error: 'Invalid Port' }).min(1, 'Invalid Port'),
    clientId: z.string().min(1, 'Required').trim(),
    username: z.string().trim().nullable(),
    password: z.string().nullable(),
    keepAlive: z.number({ required_error: 'Required', invalid_type_error: 'Invalid Value' }).min(1, 'Invalid Value'),
    cleanSession: z.boolean(),
    sslTls: z.boolean(),
    lastWill: z.boolean(),
    lastWillTopic: z.string().trim().nullable(),
    lastWillQos: z.enum(['0', '1', '2']),
    lastWillRetain: z.enum(['True', 'False']),
    lastWillMessage: z.string().trim().nullable(),
  });

  type formSchemaType = z.infer<typeof formSchema>;

  const [initialValues] = useState<formSchemaType>({
    host: connection.host ?? '',
    port: connection.port ?? 1883,
    cleanSession: connection.cleanSession ?? true,
    clientId: connection.clientId ?? generateRandomClientId(),
    keepAlive: connection.keepAlive ?? 60,
    lastWill: connection.lastWill ?? false,
    lastWillMessage: connection.lastWillMessage ?? '',
    lastWillRetain: connection.lastWillRetain ? 'True' : 'False',
    lastWillTopic: connection.lastWillTopic ?? '',
    sslTls: connection.sslTls ?? false,
    username: connection.username ?? '',
    password: connection.password ?? '',
    lastWillQos: connection.lastWillQos ?? '0',
  });

  const doConnect = async (values: FormikValues) => {

    setConnectionForm(false);

    let connection: Connection = {
      ...values,
      lastWillRetain: values.lastWillRetain == 'True',
    };

    dispatch(setConnection(connection));

    mqttClient.mqttConnect(connection);
    
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={withZodSchema(formSchema)}
      onSubmit={doConnect}
      enableReinitialize={true}
    >
      {({ setFieldValue, values }) => <Form autoComplete='off'>
        <div className="bg-white shadow-lg rounded-t-md border-b">
          <div className="p-5 flex items-center justify-between space-x-5">
            <div className="text-lg flex flex-col space-y-0.5">
              <div className="flex items-end">
                <div className="font-semibold mb-0">MQTT Online Client</div>
                <div className="ml-2 mb-1 text-xs text-gray-500">by <a href="https://iyoti.id" target="_blank" className="text-sm text-emerald-600 hover:underline hover:cursor-pointer">IYOTI</a></div>
              </div>
              <div className="flex items-center space-x-2 text-sm pt-1">
                <ConnectionStatus />
              </div>
            </div>
            <div className="flex items-center space-x-4 shrink-0">

              {connectionStatus == 'Disconnected' &&
                <button type="submit" className="flex w-full items-center justify-center flex-grow-0 px-4 py-2.5 text-white transition-colors duration-200 bg-emerald-500 rounded-md hover:bg-emerald-600 focus:outline-none font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                  </svg>
                  Connect
                </button>
              }

              {connectionStatus == 'Connected' &&
                <button onClick={() => mqttClient.mqttDisconnect()} type="button" className="flex w-full items-center justify-center flex-grow-0 px-4 py-2.5 text-white transition-colors duration-200 bg-red-500 rounded-md hover:bg-red-600 focus:outline-none font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
                  </svg>
                  Disconnect
                </button>
              }

              {(connectionStatus == 'Connecting' || connectionStatus == 'Disconnecting') &&
                <button disabled={connectionStatus == 'Disconnecting'} type="button" className={clsx(`flex w-full items-center justify-center flex-grow-0 px-4 py-2.5 text-white transition-colors duration-200 rounded-md focus:outline-none font-medium`,
                  connectionStatus == 'Disconnecting' && 'bg-red-400 cursor-not-allowed',
                  connectionStatus == 'Connecting' && 'bg-emerald-400 hover:bg-emerald-500 cursor-pointer'
                )} onClick={() => {
                  if (connectionStatus == 'Connecting') {
                    mqttClient.mqttDisconnect();
                  } else {
                    return null;
                  }
                }}>
                  <svg aria-hidden="true" className="w-4 h-4 mr-2 text-gray-200 animate-spin fill-emerald-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  {connectionStatus == 'Connecting' ? 'Cancel' : connectionStatus}
                </button>
              }

              <button onClick={() => setConnectionForm(!connectionForm)} type="button" className="flex border flex-nowrap w-full items-center justify-center flex-grow-0 p-2.5 transition-colors duration-200 rounded-md bg-white hover:bg-gray-200 focus:outline-none font-medium">

                {connectionForm && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>}

                {!connectionForm && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>}

              </button>

            </div>
          </div>
          <div className={clsx(`p-5 border-t`, connectionForm ? 'block' : 'hidden')}>
            <div className="grid grid-cols-3 gap-y-3 gap-x-5">
              <div>
                <label className="block mb-3 text-sm text-gray-700">
                  Host <Required />
                </label>

                <div className="flex">
                  <div className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                    {protocol}
                  </div>

                  <Field name="host" type="text" className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400 rounded-l-none border border-gray-200 rounded-md focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40" onChange={(e: any) => setFieldValue('host', e.target.value.replace(/\s/g, ''))} />

                </div>

                <ErrorMessage name="host" component='div' className='text-red-600 mt-2 font-normal text-xs' />
              </div>

              <div>
                <label className="block mb-3 text-sm text-gray-700">
                  Port <Required />
                </label>

                <Field name="port" type="number" className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40" />

                <ErrorMessage name="port" component='div' className='text-red-600 mt-2 font-normal text-xs' />
              </div>

              <div>
                <label className="block mb-3 text-sm text-gray-700">
                  Client ID <Required />
                </label>

                <div className="flex">

                  <Field name="clientId" type="text" className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40 rounded-r-none" />

                  <button type="button" onClick={() => setFieldValue('clientId', generateRandomClientId())} className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                  </button>

                </div>

                <ErrorMessage name="clientId" component='div' className='text-red-600 mt-2 font-normal text-xs' />
              </div>

              <div>
                <label className="block mb-3 text-sm text-gray-700">
                  Username
                </label>

                <Field name="username" type="text" className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40" />

                <ErrorMessage name="username" component='div' className='text-red-600 mt-2 font-normal text-xs' />
              </div>

              <div>
                <label className="block mb-3 text-sm text-gray-700">
                  Password
                </label>

                <Field name="password" type="password" className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40" />

                <ErrorMessage name="password" component='div' className='text-red-600 mt-2 font-normal text-xs' />
              </div>

              <div className="flex space-x-5 items-start">
                <div>
                  <label className="block mb-3 text-sm text-gray-700">
                    Keep Alive
                  </label>

                  <Field name="keepAlive" min="1" type="number" className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40" />

                  <ErrorMessage name="keepAlive" component='div' className='text-red-600 mt-2 font-normal text-xs' />
                </div>
                <div className="mt-2 flex flex-col w-full items-end space-y-1">
                  <div className="w-full flex items-center">
                    <Field name="cleanSession" id="cleanSession" type="checkbox" className="w-3.5 h-3.5 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-0 focus:ring-transparent" />
                    <label htmlFor="cleanSession" className="ml-2 text-sm">Clean Session</label>
                  </div>
                  <div className="w-full flex items-center">
                    <Field name="sslTls" id="sslTls" type="checkbox" className="w-3.5 h-3.5 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-0 focus:ring-transparent" onChange={(e: any) => {
                      setFieldValue('sslTls', e.target.checked);
                      setProtocol(e.target.checked ? 'wss://' : 'ws://');
                    }} />
                    <label htmlFor="sslTls" className="ml-2 text-sm">SSL</label>
                  </div>
                  <div className="w-full flex items-center">
                    <Field name="lastWill" id="lastWill" type="checkbox" className="w-3.5 h-3.5 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-0 focus:ring-transparent" onChange={(e: any) => {
                      setFieldValue('lastWill', e.target.checked);
                    }} />
                    <label htmlFor="lastWill" className="ml-2 text-sm">Last Will and Testament</label>
                  </div>
                </div>
              </div>
            </div>
            <div className={clsx(`grid grid-cols-3 gap-y-3 gap-x-5 mt-5`, values.lastWill ? '' : 'hidden')}>
              <div className="col-span-2">
                <label className="block mb-3 text-sm text-gray-700">
                  Last-Will Topic
                </label>

                <Field name="lastWillTopic" type="text" className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40" />

                <ErrorMessage name="lastWillTopic" component='div' className='text-red-600 mt-2 font-normal text-xs' />
              </div>

              <div className="flex space-x-5 items-start justify-start">
                <div className="w-full">
                  <label className="block mb-3 text-sm text-gray-700">
                    Last-Will QoS
                  </label>

                  <Field as="select" name="lastWillQos" className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40">
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                  </Field>

                  <ErrorMessage name="lastWillQos" component='div' className='text-red-600 mt-2 font-normal text-xs' />
                </div>
                <div className="w-full">
                  <div>
                    <label className="block mb-3 text-sm text-gray-700">
                      Last-Will Retain
                    </label>

                    <Field as="select" name="lastWillRetain" className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40">
                      <option>False</option>
                      <option>True</option>
                    </Field>

                    <ErrorMessage name="lastWillRetain" component='div' className='text-red-600 mt-2 font-normal text-xs' />
                  </div>
                </div>
              </div>

              <div className="col-span-3">
                <label className="block mb-3 text-sm text-gray-700">
                  Last-Will Message
                </label>

                <Field name="lastWillMessage" as="textarea" rows={4} className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40" />

                <ErrorMessage name="lastWillMessage" component='div' className='text-red-600 mt-2 font-normal text-xs' />
              </div>
            </div>

          </div>
        </div >
      </Form>
      }
    </Formik >
  )
}
