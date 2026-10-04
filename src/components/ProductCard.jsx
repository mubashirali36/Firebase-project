import { Link } from "react-router-dom";
import { money } from "../utils/helpers";

export default function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="block group">
      <div className="bg-surface rounded-2xl aspect-square overflow-hidden">
        <img src={product.image} alt={product.name} loading="lazy"
          onError={(e) => { e.currentTarget.style.visibility = "hidden"; }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <h3 className="font-semibold mt-3 truncate">{product.name}</h3>
      <p className="text-xs text-muted">{product.category}</p>
      <p className="text-xl font-semibold mt-1">{money(product.price)}</p>
    </Link>
  );
}
