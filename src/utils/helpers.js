export const CATEGORIES = ["Casual", "Formal", "Party", "Gym"];
export const SIZES = ["Small", "Medium", "Large", "X-Large"];
export const ORDER_STATUSES = ["Pending", "Processing", "Delivered"];

export const money = (n) => `$${Number(n || 0).toFixed(2)}`;

export const formatDate = (ts) => {
  const d = ts?.toDate ? ts.toDate() : null;
  return d ? d.toLocaleString() : "Just now";
};

export const authError = (err) => {
  const map = {
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect email or password.",
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/weak-password": "Password must be at least 6 characters.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/too-many-requests": "Too many attempts. Try again in a few minutes.",
    "auth/network-request-failed": "Network error. Check your connection.",
  };
  return map[err?.code] || err?.message || "Something went wrong.";
};
