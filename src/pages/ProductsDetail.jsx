import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import { SIZES, money } from "../utils/helpers";

export default function ProductsDetail() {
  const { id } = useParams();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const [size, setSize] = useState("Large");
  const [qty, setQty] = useState(1);
  const [busy, setBusy] = useState(false);

  if (loading) return <Spinner full />;
  const product = products.find((p) => p.id === id);
  if (!product) return (
    <div className="container-x py-20 text-center">
      <p className="mb-4">This product is no longer available.</p>
      <Link to="/products" className="btn">Back to shop</Link>
    </div>
  );
  const related = products.filter((p) => p.id !== id && p.category === product.category).slice(0, 4);

  const add = async () => { setBusy(true); await addToCart(product, size, qty); setBusy(false); };

  return (
    <div className="container-x py-8">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="bg-surface rounded-3xl aspect-square overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="font-display text-3xl lg:text-5xl">{product.name}</h1>
          <p className="text-3xl font-bold mt-4">{money(product.price)}</p>
          <p className="text-muted mt-4 pb-6 border-b border-black/10">{product.description}</p>

          <h3 className="text-muted mt-6 mb-3">Choose size</h3>
          <div className="flex flex-wrap gap-2">
            {SIZES.map((s) => (
              <button key={s} onClick={() => setSize(s)} className={`rounded-full px-5 py-2 text-sm ${size === s ? "bg-black text-white" : "bg-surface"}`}>{s}</button>
            ))}
          </div>

          <div className="flex gap-4 mt-8">
            <div className="flex items-center bg-surface rounded-full">
              <button className="px-5 py-3 text-xl" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease">−</button>
              <span className="w-8 text-center">{qty}</span>
              <button className="px-5 py-3 text-xl" onClick={() => setQty(qty + 1)} aria-label="Increase">+</button>
            </div>
            <button className="btn flex-1" onClick={add} disabled={busy}>{busy ? "Adding..." : "Add to Cart"}</button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-3xl lg:text-5xl text-center mb-10">YOU MIGHT ALSO LIKE</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </section>
      )}
    </div>
  );
}
