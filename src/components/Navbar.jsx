import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Icon = ({ d }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const search = (e) => {
    e.preventDefault();
    navigate(`/products?q=${encodeURIComponent(q.trim())}`);
    setOpen(false);
  };
  const link = ({ isActive }) => (isActive ? "font-semibold" : "hover:opacity-70");

  return (
    <header className="border-b border-black/10 sticky top-0 bg-white z-40">
      <div className="container-x flex items-center gap-4 lg:gap-10 h-16 lg:h-24">
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu"><Icon d="M3 6h18M3 12h18M3 18h18" /></button>
        <Link to="/" className="font-display text-2xl lg:text-3xl tracking-tight">SHOP.CO</Link>

        <nav className="hidden lg:flex gap-6 text-base">
          <NavLink to="/products" className={link}>Shop</NavLink>
          {user && <NavLink to="/dashboard" className={link}>My Orders</NavLink>}
          {isAdmin && <NavLink to="/admin" className={link}>Admin</NavLink>}
        </nav>

        <form onSubmit={search} className="hidden lg:block flex-1">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for products..." className="input" />
        </form>

        <div className="flex items-center gap-4 ml-auto lg:ml-0">
          <Link to="/cart" className="relative" aria-label="Cart">
            <Icon d="M6 6h15l-1.5 9h-12zM6 6L5 3H2M9 20a1 1 0 100-2 1 1 0 000 2zM18 20a1 1 0 100-2 1 1 0 000 2z" />
            {count > 0 && <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{count}</span>}
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" aria-label="Account"><Icon d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" /></Link>
              <button onClick={logout} className="text-sm hover:opacity-70 bg-black text-white py-2 px-5 rounded-2xl">Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn !py-2 !px-5 text-sm">Login</Link>
          )}
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-black/10 p-4 space-y-3">
          <form onSubmit={search}><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for products..." className="input" /></form>
          <Link to="/products" onClick={() => setOpen(false)} className="block">Shop</Link>
          {user && <Link to="/dashboard" onClick={() => setOpen(false)} className="block">My Orders</Link>}
          {isAdmin && <Link to="/admin" onClick={() => setOpen(false)} className="block">Admin</Link>}
        </div>
      )}
    </header>
  );
}
