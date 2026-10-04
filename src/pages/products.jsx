import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import { CATEGORIES } from "../utils/helpers";

export default function Products() {
  const { products, loading } = useProducts();
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const category = params.get("category") || "";
  const sort = params.get("sort") || "newest";
  const max = Number(params.get("max") || 0);

  const set = (k, v) => {
    const next = new URLSearchParams(params);
    v ? next.set(k, v) : next.delete(k);
    setParams(next, { replace: true });
  };

  const priceCeiling = useMemo(() => Math.ceil(Math.max(0, ...products.map((p) => Number(p.price) || 0))), [products]);

  const list = useMemo(() => {
    let r = products.filter((p) =>
      (!q || `${p.name} ${p.description} ${p.category}`.toLowerCase().includes(q.toLowerCase())) &&
      (!category || p.category === category) &&
      (!max || Number(p.price) <= max)
    );
    if (sort === "price-asc") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") r = [...r].sort((a, b) => b.price - a.price);
    if (sort === "name") r = [...r].sort((a, b) => a.name.localeCompare(b.name));
    return r; // "newest" keeps Firestore order (createdAt desc)
  }, [products, q, category, max, sort]);

  return (
    <div className="container-x py-8 grid lg:grid-cols-[260px_1fr] gap-8">
      <aside className="border border-black/10 rounded-2xl p-5 h-fit space-y-6">
        <h2 className="font-bold text-xl">Filters</h2>
        <div>
          <h3 className="font-medium mb-3">Category</h3>
          <div className="space-y-2">
            <button onClick={() => set("category", "")} className={`block ${!category ? "font-bold" : "text-muted"}`}>All</button>
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => set("category", c)} className={`block ${category === c ? "font-bold" : "text-muted"}`}>{c}</button>
            ))}
          </div>
        </div>
        {priceCeiling > 0 && (
          <div>
            <h3 className="font-medium mb-3">Max price: ${max || priceCeiling}</h3>
            <input type="range" min="0" max={priceCeiling} value={max || priceCeiling} onChange={(e) => set("max", Number(e.target.value) >= priceCeiling ? "" : e.target.value)} className="w-full accent-black" />
          </div>
        )}
        <button className="btn w-full" onClick={() => setParams({}, { replace: true })}>Clear filters</button>
      </aside>

      <section>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="font-bold text-2xl lg:text-3xl">{category || "All products"}</h1>
            {q && <p className="text-sm text-muted">Results for “{q}”</p>}
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted">{list.length} products</span>
            <select value={sort} onChange={(e) => set("sort", e.target.value)} className="input !w-auto !py-2">
              <option value="newest">Newest</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
        {loading ? <Spinner /> : list.length === 0 ? (
          <p className="text-center text-muted py-16">No products match your filters.</p>
        ) : (
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">{list.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        )}
      </section>
    </div>
  );
}
