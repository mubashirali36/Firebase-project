import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { authError } from "../../utils/helpers";

export default function Forgetpassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try { 
      await resetPassword(email); 
      toast.success("Reset link sent. Check your inbox."); 
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
          <h1 className="font-extrabold text-3xl tracking-tight text-gray-900 mb-2">Reset Password</h1>
          <p className="text-sm text-gray-500">Enter your email and we’ll send you a link to reset your password.</p>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">Email Address</label>
            <input 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition text-sm" 
              type="email" 
              required 
              placeholder="name@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 px-4 bg-black text-white font-medium rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm" 
            disabled={busy}
          >
            {busy ? "Sending..." : "Send reset link"}
          </button>
        </form>

        <div className="text-center mt-6 border-t border-gray-100 pt-6">
          <p className="text-sm">
            <Link to="/login" className="font-medium text-gray-600 hover:text-black underline">
              ← Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}