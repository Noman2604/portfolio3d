export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#0C0D0E] text-[#EFEFF1] flex flex-col items-center justify-center p-6 font-mono text-sm">
      <div className="max-w-md w-full rounded-lg border border-[#23262D] bg-[#111317] p-8 text-center space-y-4 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181B22] border border-[#282C37] text-xs text-[#8B8F9A]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EFEFF1] animate-pulse" />
          <span>PROJECT INITIALIZED</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
          Noman Patel
        </h1>
        <p className="text-xs text-[#8B8F9A] leading-relaxed">
          Clean slate ready. Next.js 15, Tailwind CSS, TypeScript, and Three.js environment initialized.
        </p>
      </div>
    </main>
  );
}
