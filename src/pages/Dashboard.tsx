import useMqtt from "@/hooks/useMqtt";
import Connection from "@/pages/components/Connection";
import SubscriptionBox from "@/pages/components/Subscription";
import { useAppDispatch } from "@/redux/hooks";
import { setStatus } from "@/redux/slices/mqttSlice";
import { useEffect } from "react";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const mqttClient = useMqtt();
  
  useEffect(() => {
    dispatch(setStatus('Disconnected'));
  }, []);

  return (
    <div className="lg:max-w-6xl mx-auto lg:py-10 w-full">
      <Connection mqttClient={mqttClient} />
      <SubscriptionBox mqttClient={mqttClient} />

      <div className="mx-auto border-t text-center text-xs text-gray-500 bg-white p-3 rounded-b-md shadow-lg">
        Copyright &copy; 2023&nbsp;<a href="#" className="hover:underline hover:text-emerald-600">iyoti.id</a>. All rights reserved
      </div>
    </div>
  )
}
