import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { doc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../config/firebase";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) { setItems([]); return; }
    setLoading(true);
    return onSnapshot(
      doc(db, "carts", user.uid),
      (snap) => { setItems(snap.exists() ? snap.data().items || [] : []); setLoading(false); },
      () => setLoading(false)
    );
  }, [user]);

  const save = async (next) => {
    try {
      await setDoc(doc(db, "carts", user.uid), { items: next, updatedAt: serverTimestamp() });
    } catch {
      toast.error("Could not update your cart.");
    }
  };

  const addToCart = async (product, size, qty = 1) => {
    if (!user) { toast.info("Please log in to add items to your cart."); return false; }
    const key = `${product.id}_${size}`;
    const exists = items.find((i) => i.key === key);
    const next = exists
      ? items.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i))
      : [...items, { key, productId: product.id, name: product.name, price: Number(product.price), image: product.image, size, qty }];
    await save(next);
    toast.success("Added to cart");
    return true;
  };

  const updateQty = (key, qty) =>
    save(qty < 1 ? items.filter((i) => i.key !== key) : items.map((i) => (i.key === key ? { ...i, qty } : i)));
  const removeItem = (key) => save(items.filter((i) => i.key !== key));

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);
  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);

  return (
    <CartContext.Provider value={{ items, loading, subtotal, count, addToCart, updateQty, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}
