import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { authError } from "../../utils/helpers";

export default function Login() {
  const { user, isAdmin, profile, login, loginWithGoogle } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const from = useLocation().state?.from?.pathname;

  // Jab user login ho jaye toh homepage ya target page par navigate kar dein
  useEffect(() => {
    if (user && profile) {
      navigate(from || (isAdmin ? "/admin" : "/"), { replace: true });
    }
  }, [user, profile, isAdmin, from, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try { 
      await login(form.email, form.password); 
      toast.success("Welcome back!"); 
    } catch (err) { 
      toast.error(authError(err)); 
    } finally { 
      setBusy(false); 
    }
  };

  // Google Login Handler
  const handleGoogleLogin = async () => {
    setBusy(true);
    try {
      await loginWithGoogle();
      toast.success("Logged in with Google successfully!");
      navigate("/", { replace: true });
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
          <h1 className="font-extrabold text-3xl tracking-tight text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-sm text-gray-500">Log in to your SHOP.CO account</p>
        </div>

        {/* Google Login Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={busy}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-200 disabled:opacity-50 mb-6"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          Continue with Google
        </button>

        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t border-gray-200 w-full"></div>
          <span className="absolute bg-white px-3 text-xs uppercase text-gray-400 font-semibold">Or with email</span>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">Email Address</label>
            <input 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition text-sm" 
              type="email" 
              required 
              placeholder="name@example.com" 
              value={form.email} 
              onChange={(e) => setForm({ ...form, email: e.target.value })} 
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">Password</label>
              <Link to="/forgot-password" class="text-xs font-medium text-gray-600 hover:text-black underline">
                Forgot?
              </Link>
            </div>
            <input 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition text-sm" 
              type="password" 
              required 
              placeholder="••••••••" 
              value={form.password} 
              onChange={(e) => setForm({ ...form, password: e.target.value })} 
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 px-4 bg-black text-white font-medium rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm" 
            disabled={busy}
          >
            {busy ? "Logging in..." : "Log in"}
          </button>
        </form>

        <div className="mt-6 space-y-3 text-center border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-600">
            New here?{" "}
            <Link to="/register" className="font-semibold text-black hover:underline">
              Create an account
            </Link>
          </p>
          <p className="text-sm">
            <Link to="/admin/login" className="text-gray-500 hover:text-black font-medium underline">
              Admin Login Portal
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}