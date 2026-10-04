import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import { ORDER_STATUSES, formatDate, money } from "../utils/helpers";

function Tracker({ status }) {
  const idx = ORDER_STATUSES.indexOf(status);
  return (
    <div className="flex items-center gap-2 mt-3">
      {ORDER_STATUSES.map((s, i) => (
        <div key={s} className="flex items-center gap-2 flex-1 last:flex-none">
          <span className={`text-xs px-3 py-1 rounded-full ${i <= idx ? "bg-black text-white" : "bg-surface text-muted"}`}>{s}</span>
          {i < ORDER_STATUSES.length - 1 && <div className={`h-0.5 flex-1 ${i < idx ? "bg-black" : "bg-black/10"}`} />}
        </div>
      ))}
    </div>
  );
}

export default function UserDashboard() {
  const { user, profile } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // no orderBy => no composite index needed; sorted client-side
    const q = query(collection(db, "orders"), where("userId", "==", user.uid));
    return onSnapshot(q, (snap) => {
      const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      rows.sort((a, b) => (b.createdAt?.seconds || 9e9) - (a.createdAt?.seconds || 9e9));
      setOrders(rows);
      setLoading(false);
    }, () => setLoading(false));
  }, [user.uid]);

  return (
    <div className="container-x py-8 grid lg:grid-cols-[300px_1fr] gap-8">
      <aside className="border border-black/10 rounded-2xl p-6 h-fit">
        <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold">
          {(profile?.name || user.email)[0].toUpperCase()}
        </div>
        <h2 className="font-bold text-xl mt-4">{profile?.name || "Customer"}</h2>
        <p className="text-muted text-sm break-all">{user.email}</p>
        <p className="text-sm mt-3">Role: <b className="capitalize">{profile?.role}</b></p>
      </aside>

      <section>
        <h1 className="font-display text-3xl mb-6">MY ORDERS</h1>
        {loading ? <Spinner /> : orders.length === 0 ? (
          <p className="text-muted">You haven’t placed any orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="border border-black/10 rounded-2xl p-5">
                <div className="flex flex-wrap justify-between gap-2">
                  <div><p className="font-bold">Order #{o.id.slice(0, 8).toUpperCase()}</p><p className="text-xs text-muted">{formatDate(o.createdAt)}</p></div>
                  <p className="font-bold text-xl">{money(o.total)}</p>
                </div>
                <Tracker status={o.status} />
                <ul className="mt-4 text-sm text-muted space-y-1">
                  {o.items.map((i) => <li key={i.key}>{i.qty} × {i.name} ({i.size})</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
