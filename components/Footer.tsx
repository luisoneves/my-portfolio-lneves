"use client"

export function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-16">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground font-mono">
          © {new Date().getFullYear()} Luis Otavio Neves Faustino
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/luisoneves"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono"
          >
            github
          </a>
          <a
            href="https://linkedin.com/in/luisneves-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono"
          >
            linkedin
          </a>
          <a
            href="mailto:contato@luisneves.dev.br"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono"
          >
            contato
          </a>
        </div>
      </div>
    </footer>
  )
}
