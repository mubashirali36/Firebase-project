import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, doc, serverTimestamp, writeBatch } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Spinner from "../components/Spinner";
import { money } from "../utils/helpers";

const DELIVERY = 15;

export default function Cart() {
  const { user, profile } = useAuth();
  const { items, loading, subtotal, updateQty, removeItem } = useCart();
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const delivery = items.length ? DELIVERY : 0;
  const total = subtotal + delivery;

  const placeOrder = async () => {
    setBusy(true);
    try {
      const batch = writeBatch(db);
      const orderRef = doc(collection(db, "orders"));
      batch.set(orderRef, {
        userId: user.uid,
        email: user.email,
        name: profile?.name || user.displayName || "",
        items, subtotal, delivery, total,
        status: "Pending",
        createdAt: serverTimestamp(),
      });
      batch.set(doc(db, "carts", user.uid), { items: [], updatedAt: serverTimestamp() });
      await batch.commit(); // order + cart clear succeed or fail together
      toast.success("Order placed!");
      navigate("/dashboard");
    } catch {
      toast.error("Could not place your order. Please try again.");
    } finally { setBusy(false); }
  };

  if (loading) return <Spinner full />;

  return (
    <div className="container-x py-8">
      <h1 className="font-display text-4xl mb-6">YOUR CART</h1>
      {items.length === 0 ? (
        <div className="text-center py-16"><p className="text-muted mb-4">Your cart is empty.</p><Link to="/products" className="btn">Start shopping</Link></div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_400px] gap-6">
          <div className="border border-black/10 rounded-2xl p-4 lg:p-6 divide-y divide-black/10">
            {items.map((i) => (
              <div key={i.key} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                <img src={i.image} alt={i.name} className="w-24 h-24 rounded-xl object-cover bg-surface" />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between gap-2">
                    <div><h3 className="font-bold">{i.name}</h3><p className="text-sm">Size: <span className="text-muted">{i.size}</span></p></div>
                    <button onClick={() => removeItem(i.key)} className="text-sale text-sm" aria-label="Remove">Remove</button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">{money(i.price)}</span>
                    <div className="flex items-center bg-surface rounded-full">
                      <button className="px-4 py-2" onClick={() => updateQty(i.key, i.qty - 1)}>−</button>
                      <span className="w-6 text-center text-sm">{i.qty}</span>
                      <button className="px-4 py-2" onClick={() => updateQty(i.key, i.qty + 1)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border border-black/10 rounded-2xl p-5 h-fit space-y-4">
            <h2 className="font-bold text-xl">Order Summary</h2>
            <div className="flex justify-between"><span className="text-muted">Subtotal</span><b>{money(subtotal)}</b></div>
            <div className="flex justify-between"><span className="text-muted">Delivery Fee</span><b>{money(delivery)}</b></div>
            <div className="flex justify-between border-t border-black/10 pt-4 text-lg"><span>Total</span><b>{money(total)}</b></div>
            <button className="btn w-full" onClick={placeOrder} disabled={busy}>{busy ? "Placing order..." : "Place Order"}</button>
          </div>
        </div>
      )}
    </div>
  );
}
