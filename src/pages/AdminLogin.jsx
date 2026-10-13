import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
import { authError } from "../utils/helpers";

export default function AdminLogin() {
  const { user, isAdmin, login, logout } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { if (user && isAdmin) navigate("/admin", { replace: true }); }, [user, isAdmin, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await login(form.email, form.password);
      const snap = await getDoc(doc(db, "users", auth.currentUser.uid));
      if (snap.data()?.role !== "admin") {
        await logout();
        toast.error("This account does not have admin access.");
      }
    } catch (err) { toast.error(authError(err)); }
    finally { setBusy(false); }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h1 className="font-display text-3xl font-bold text-center mb-6 text-gray-900">ADMIN LOGIN</h1>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
            <input 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none" 
              type="email" 
              required 
              placeholder="Enter admin email" 
              value={form.email} 
              onChange={(e) => setForm({ ...form, email: e.target.value })} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none" 
              type="password" 
              required 
              placeholder="Enter password" 
              value={form.password} 
              onChange={(e) => setForm({ ...form, password: e.target.value })} 
            />
          </div>
          <button 
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition duration-200 disabled:bg-gray-400 mt-2" 
            disabled={busy}
          >
            {busy ? "Checking..." : "Log in as admin"}
          </button>
        </form>
      </div>
    </div>
  );
}