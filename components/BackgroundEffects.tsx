"use client"

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* LEFT: Remove this div to disable left glow effect */}
      <div className="absolute top-1/3 left-[-150px] w-[400px] h-[400px] bg-yellow-400/20 rounded-full blur-[120px] animate-pulse" />

      {/* RIGHT: Remove this div to disable right glow effect */}
      <div className="absolute bottom-1/3 right-[-150px] w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-[120px] animate-pulse" />
    </div>
  )
}
