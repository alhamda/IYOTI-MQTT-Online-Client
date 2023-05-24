import { useState } from "react";
import { Subscription } from "@/models/Subscription";
import Publish from "@/pages/components/Publish";
import SubscriptionBar from "@/pages/components/SubscriptionBar";
import Menu from "@/pages/components/Menu";
import SubscriptionResult from "@/pages/components/SubscriptionResult";
import PublishResult from "@/pages/components/PublishResult";

export default function Wrapper({ mqttClient }: { mqttClient: any }) {

  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [tab, setTab] = useState<'Received' | 'Published'>('Received');

  return (
    <>
      <div className="bg-white shadow-lg">
        <div className="flex flex-row max-h-[870px]">

          <SubscriptionBar
            mqttClient={mqttClient}
            setSubscription={setSubscription}
            subscription={subscription}
          />

          <div className="flex w-full">
            <div className="flex flex-col h-full w-full border border-r-0 border-t-0 border-b-0">

              <Menu tab={tab} setTab={setTab} subscription={subscription} />

              <div className="p-5 h-full w-full overflow-y-auto bg-gray-100 min-h-[500px] max-h-full">

                {
                  tab == 'Received' &&
                  <SubscriptionResult setSubscription={setSubscription} subscription={subscription} />
                }

                {
                  tab == 'Published' &&
                  <PublishResult subscription={subscription} />
                }

              </div>

              <div className="bg-white w-full border-t rounded-br-md">
                <Publish mqttClient={mqttClient} />
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
