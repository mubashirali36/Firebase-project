import { useState } from "react";
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../config/firebase";
import { useProducts } from "../../context/ProductsContext";
import Spinner from "../Spinner";
import { CATEGORIES, money } from "../../utils/helpers";

const empty = { name: "", price: "", image: "", category: CATEGORIES[0], description: "" };

export default function ProductsTab() {
  const { products, loading } = useProducts();
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const reset = () => { setForm(empty); setEditingId(null); };

  const submit = async (e) => {
    e.preventDefault();
    const price = Number(form.price);
    if (!(price > 0)) return toast.error("Enter a valid price.");
    setBusy(true);
    try {
      const data = { ...form, price, name: form.name.trim() };
      if (editingId) { await updateDoc(doc(db, "products", editingId), data); toast.success("Product updated"); }
      else { await addDoc(collection(db, "products"), { ...data, createdAt: serverTimestamp() }); toast.success("Product added"); }
      reset();
    } catch { toast.error("Could not save the product."); }
    finally { setBusy(false); }
  };

  const edit = (p) => {
    setEditingId(p.id);
    setForm({ name: p.name, price: p.price, image: p.image, category: p.category, description: p.description });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (p) => {
    if (!window.confirm(`Delete “${p.name}”?`)) return;
    try { await deleteDoc(doc(db, "products", p.id)); toast.success("Product deleted"); if (editingId === p.id) reset(); }
    catch { toast.error("Could not delete the product."); }
  };

  return (
    <div className="grid xl:grid-cols-[380px_1fr] gap-6">
      <form onSubmit={submit} className="border border-black/10 rounded-2xl p-5 space-y-3 h-fit">
        <h2 className="font-bold text-xl">{editingId ? "Edit product" : "Add product"}</h2>
        <input className="input" required placeholder="Name" value={form.name} onChange={set("name")} />
        <input className="input" required type="number" step="0.01" min="0" placeholder="Price" value={form.price} onChange={set("price")} />
        <input className="input" required type="url" placeholder="Image URL" value={form.image} onChange={set("image")} />
        <select className="input" value={form.category} onChange={set("category")}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
        <textarea className="input" required rows={4} placeholder="Description" value={form.description} onChange={set("description")} />
        {form.image && <img src={form.image} alt="" className="w-24 h-24 rounded-xl object-cover bg-surface" onError={(e) => (e.currentTarget.style.visibility = "hidden")} />}
        <div className="flex gap-2">
          <button className="btn flex-1" disabled={busy}>{busy ? "Saving..." : editingId ? "Save changes" : "Add product"}</button>
          {editingId && <button type="button" className="btn btn-outline" onClick={reset}>Cancel</button>}
        </div>
      </form>

      <div className="border border-black/10 rounded-2xl overflow-x-auto">
        {loading ? <Spinner /> : products.length === 0 ? <p className="p-6 text-muted">No products yet. Add your first one.</p> : (
          <table className="w-full text-sm">
            <thead className="bg-surface text-left"><tr><th className="p-3">Product</th><th className="p-3">Category</th><th className="p-3">Price</th><th className="p-3" /></tr></thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-black/10">
                  <td className="p-3"><div className="flex items-center gap-3"><img src={p.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-surface" /><span className="font-medium">{p.name}</span></div></td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3">{money(p.price)}</td>
                  <td className="p-3 text-right whitespace-nowrap">
                    <button onClick={() => edit(p)} className="underline mr-4">Edit</button>
                    <button onClick={() => remove(p)} className="text-sale underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
