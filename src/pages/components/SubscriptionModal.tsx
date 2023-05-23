import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Required from '@/components/UI/Required';
import { useAppDispatch } from '@/redux/hooks';
import { addSubscription, addSubscriptionItem } from '@/redux/slices/mqttSlice';
import { v4 as uuidv4 } from 'uuid';
import { Subscription, SubscriptionItem } from '@/models/Subscription';

const SubscriptionModal = ({
  mqttClient,
  isOpen,
  setIsOpen,
}: {
  mqttClient: any,
  isOpen: boolean;
  setIsOpen: any
}) => {

  const dispatch = useAppDispatch();

  const [topic, setTopic] = useState('');
  const [qos, setQos] = useState('0');

  function closeModal() {
    setIsOpen(false)
  }

  async function doAdd() {

    let subscription: Subscription = {
      id: uuidv4(),
      qos: +qos,
      topic
    };

    await mqttClient.mqttSubscribe(subscription);
    dispatch(addSubscription(subscription));
    closeModal();
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
                  <div className='p-5 py-3 flex items-center space-x-5 border-b'>
                    <div className='w-full font-medium text-lg'>
                      New Subscription
                    </div>
                    <button onClick={closeModal} className='p-2 hover:bg-gray-100 text-gray-500 hover:text-gray-800 rounded-md'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className='p-5'>
                    <div className="mt-0">
                      <label className="block mb-3 text-sm text-gray-700">
                        Topic <Required />
                      </label>

                      <input onChange={(e) => setTopic(e.target.value)} type="text" className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40" />
                    </div>
                    <div className="mt-6">
                      <label className="block mb-3 text-sm text-gray-700">
                        QoS <Required />
                      </label>

                      <select onChange={(e) => setQos(e.target.value)} className="bg-white focus:bg-white block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:border-gray-400 focus:ring-gray-400 transition-colors focus:outline-none focus:ring-0 focus:ring-opacity-40">
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-end p-4 border-t mt-3">
                    <div className='flex space-x-4 flex-row font-medium'>
                      <div className='flex items-center justify-center space-x-2'>
                        <a href="#" onClick={closeModal} className="flex items-center space-x-3 px-4 py-3 transition-colors duration-200 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none">
                          Cancel
                        </a>
                      </div>
                      <div className='flex items-center justify-center space-x-4'>
                        <button onClick={doAdd} className="flex items-center space-x-3 px-4 py-3 text-white transition-colors duration-200 bg-emerald-500 rounded-md hover:bg-emerald-600 focus:outline-none">
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SubscriptionModal;