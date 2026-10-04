export default function Spinner({ full = false }) {
  return (
    <div className={`flex items-center justify-center ${full ? "min-h-[60vh]" : "py-16"}`}>
      <div className="h-10 w-10 rounded-full border-4 border-black/10 border-t-black animate-spin" />
    </div>
  );
}
