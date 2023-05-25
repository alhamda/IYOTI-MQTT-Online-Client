import Footer from "@/components/UI/Footer";
import useMqtt from "@/hooks/useMqtt";
import ConnectionBar from "@/pages/components/ConnectionBar";
import Wrapper from "@/pages/components/Wrapper";
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
      <ConnectionBar mqttClient={mqttClient} />
      <Wrapper mqttClient={mqttClient} />

      <Footer />
    </div>
  )
}
