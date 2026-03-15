"use client"

export function CommandPaletteHint() {
  return (
    <button
      onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, ctrlKey: true, bubbles: true }))}
      className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground
        border border-border rounded-md px-2.5 py-1 hover:border-muted-foreground/50 transition-colors"
    >
      <kbd className="font-mono">⌘K</kbd>
    </button>
  )
}
