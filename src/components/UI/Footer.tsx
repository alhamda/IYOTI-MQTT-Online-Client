import moment from "moment";

export default function Footer() {
  return (
    <div className="mx-auto border-t text-center text-xs text-gray-500 bg-white p-3 rounded-b-md shadow-lg">
      Copyright &copy; {moment(new Date()).year().toString()} <a href="https://iyoti.id" target="_blank" className="hover:underline hover:text-emerald-600">IYOTI - iyoti.id</a>. All rights reserved
    </div>
  )
}
