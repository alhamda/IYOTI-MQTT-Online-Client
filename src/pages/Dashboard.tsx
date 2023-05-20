import Connection from "@/pages/components/Connection";
import Subscription from "@/pages/components/Subscription";

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto py-10 w-full">
      <Connection />
      <Subscription />
    </div>
  )
}
