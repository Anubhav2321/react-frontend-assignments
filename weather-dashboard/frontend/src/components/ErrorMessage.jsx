export default function ErrorMessage({ message }) {
  if (!message) return null;
  
  return (
    <div className="mx-auto max-w-md bg-rose-950/40 border border-rose-500/70 backdrop-blur-md text-rose-400 px-5 py-4 rounded-lg text-center font-mono text-sm tracking-widest shadow-[0_0_20px_rgba(225,29,72,0.3)] mb-6 uppercase">
      <span className="font-bold mr-2 text-rose-500">⚠ SYSTEM WARNING:</span>
      {message}
    </div>
  );
}