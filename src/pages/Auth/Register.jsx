import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { authError } from "../../utils/helpers";

export default function Register() {
  const { user, profile, register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { 
    if (user && profile) navigate("/", { replace: true }); 
  }, [user, profile, navigate]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      return toast.error("Passwords do not match.");
    }
    setBusy(true);
    try { 
      await register(form); 
      toast.success("Account created successfully!"); 
    } catch (err) { 
      toast.error(authError(err)); 
    } finally { 
      setBusy(false); 
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="font-extrabold text-3xl tracking-tight text-gray-900 mb-2">Create Account</h1>
          <p className="text-sm text-gray-500">Sign up to get started with SHOP.CO</p>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">Full Name</label>
            <input 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition text-sm" 
              required 
              placeholder="Mubashir Ali" 
              value={form.name} 
              onChange={set("name")} 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">Email Address</label>
            <input 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition text-sm" 
              type="email" 
              required 
              placeholder="name@example.com" 
              value={form.email} 
              onChange={set("email")} 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">Password</label>
            <input 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition text-sm" 
              type="password" 
              required 
              minLength={6} 
              placeholder="•••••••• (min 6 chars)" 
              value={form.password} 
              onChange={set("password")} 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">Confirm Password</label>
            <input 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition text-sm" 
              type="password" 
              required 
              placeholder="••••••••" 
              value={form.confirm} 
              onChange={set("confirm")} 
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 px-4 bg-black text-white font-medium rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm" 
            disabled={busy}
          >
            {busy ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-black hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}