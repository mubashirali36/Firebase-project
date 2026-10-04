import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../Spinner";

export default function UsersTab() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => onSnapshot(collection(db, "users"), (snap) => {
    setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  }, () => { toast.error("Could not load users."); setLoading(false); }), []);

  const setRole = async (u, role) => {
    try { await updateDoc(doc(db, "users", u.id), { role }); toast.success(`${u.email} is now ${role}`); }
    catch { toast.error("Could not change the role."); }
  };

  if (loading) return <Spinner />;

  return (
    <div className="border border-black/10 rounded-2xl overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-surface text-left"><tr><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Role</th><th className="p-3" /></tr></thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t border-black/10">
              <td className="p-3">{u.name || "—"}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3 capitalize">{u.role}</td>
              <td className="p-3 text-right">
                {u.id === user.uid ? <span className="text-muted">You</span> : u.role === "admin"
                  ? <button className="underline" onClick={() => setRole(u, "user")}>Demote to user</button>
                  : <button className="underline" onClick={() => setRole(u, "admin")}>Promote to admin</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
