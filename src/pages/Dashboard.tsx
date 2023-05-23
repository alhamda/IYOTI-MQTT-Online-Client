import Connection from "@/pages/components/Connection";
import Subscription from "@/pages/components/Subscription";

export default function Dashboard() {
  return (
    <div className="lg:max-w-6xl mx-auto lg:py-10 w-full">
      <Connection />
      <Subscription />

      <div className="mx-auto border-t text-center text-xs text-gray-500 bg-white p-3 rounded-b-md shadow-lg">
        Copyright &copy; 2023&nbsp;<a href="#" className="hover:underline hover:text-emerald-600">iyoti.id</a>. All rights reserved
      </div>
    </div>
  )
}
