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
    <div className="container-x py-16 max-w-md">
      <h1 className="font-display text-4xl mb-8">ADMIN LOGIN</h1>
      <form onSubmit={submit} className="space-y-4">
        <input className="input" type="email" required placeholder="Admin email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="input" type="password" required placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn w-full" disabled={busy}>{busy ? "Checking..." : "Log in as admin"}</button>
      </form>
    </div>
  );
}
