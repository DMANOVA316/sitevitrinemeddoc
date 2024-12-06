import { PartnerProvider } from "@/contexts/PartnerContext";
import { Link, Outlet } from "react-router-dom";
import PartnerList from "./PartnerList";

export default function PartnerIndex() {
  return (
    <PartnerProvider>
      <div className="flex flex-col gap-2">
        <Outlet />
      </div>
    </PartnerProvider>
  );
}
