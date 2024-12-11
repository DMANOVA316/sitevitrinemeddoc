import { Link, Outlet } from "react-router-dom";
import PartnerList from "./PartnerList";

export default function PartnerIndex() {
  return (
    <div className="flex flex-col gap-2">
      <Outlet />
    </div>
  );
}
