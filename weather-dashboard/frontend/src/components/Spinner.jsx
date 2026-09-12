export default function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-5">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-transparent border-t-[#00f3ff] border-b-[#bc13fe] rounded-full animate-spin drop-shadow-[0_0_15px_rgba(0,243,255,0.8)]" />
        <div className="absolute inset-2 border-4 border-transparent border-l-[#bc13fe] border-r-[#00f3ff] rounded-full animate-[spin_1.5s_reverse_infinite] opacity-70" />
      </div>
      <p className="text-[#00f3ff] font-mono text-sm tracking-[0.3em] uppercase animate-pulse">
        Establishing Link...
      </p>
    </div>
  );
}