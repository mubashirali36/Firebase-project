import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Topbar() {
  const { user } = useAuth();
  if (user) return null;
  return (
    <div className="bg-black text-white text-center text-sm py-2 px-4">
      Sign up and get 20% off to your first order.{" "}
      <Link to="/register" className="underline font-medium">Sign Up Now</Link>
    </div>
  );
}
