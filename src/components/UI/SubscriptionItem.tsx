export default function SubscriptionItem() {
  return (
    <div className="cursor-pointer p-3 border w-full rounded-md hover:bg-slate-100 border-slate-100/80 bg-slate-100/50 text-slate-600">
      <div className="flex items-center space-x-3 text-sm">
        <div className="flex grow line-clamp-1">#/alhamda/ganteng/banget</div>
        <div className="text-gray-400 flex-shrink-0 text-xs">Qos 0</div>
      </div>
    </div>
  )
}
