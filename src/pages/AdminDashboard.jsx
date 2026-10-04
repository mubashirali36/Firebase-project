import { useState } from "react";
import ProductsTab from "../components/admin/ProductsTab";
import OrdersTab from "../components/admin/OrdersTab";
import UsersTab from "../components/admin/UsersTab";

const tabs = { Products: ProductsTab, Orders: OrdersTab, Users: UsersTab };

export default function AdminDashboard() {
  const [tab, setTab] = useState("Products");
  const Active = tabs[tab];
  return (
    <div className="container-x py-8">
      <h1 className="font-display text-4xl mb-6">ADMIN PANEL</h1>
      <div className="flex gap-2 mb-6">
        {Object.keys(tabs).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-full px-6 py-2 ${tab === t ? "bg-black text-white" : "bg-surface"}`}>{t}</button>
        ))}
      </div>
      <Active />
    </div>
  );
}
