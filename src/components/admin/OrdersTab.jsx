import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../config/firebase";
import Spinner from "../Spinner";
import { ORDER_STATUSES, formatDate, money } from "../../utils/helpers";

export default function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) => {
      setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, () => { toast.error("Could not load orders."); setLoading(false); });
  }, []);

  const setStatus = async (id, status) => {
    try { await updateDoc(doc(db, "orders", id), { status }); toast.success(`Order marked ${status}`); }
    catch { toast.error("Could not update the order."); }
  };

  if (loading) return <Spinner />;
  if (orders.length === 0) return <p className="text-muted">No orders yet.</p>;

  return (
    <div className="space-y-4">
      {orders.map((o) => (
        <div key={o.id} className="border border-black/10 rounded-2xl p-5">
          <div className="flex flex-wrap justify-between gap-3">
            <div>
              <p className="font-bold">#{o.id.slice(0, 8).toUpperCase()} · {o.email}</p>
              <p className="text-xs text-muted">{formatDate(o.createdAt)}</p>
            </div>
            <div className="flex items-center gap-4">
              <b className="text-lg">{money(o.total)}</b>
              <select value={o.status} onChange={(e) => setStatus(o.id, e.target.value)} className="input !w-auto !py-2">
                {ORDER_STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <ul className="mt-3 text-sm text-muted space-y-1">
            {o.items.map((i) => <li key={i.key}>{i.qty} × {i.name} ({i.size}) — {money(i.price * i.qty)}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}
