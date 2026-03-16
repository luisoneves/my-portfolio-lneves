export interface Note {
  key: "note1" | "note2" | "note3"
  href?: string
}

export const notes: Note[] = [
  {
    key: "note1",
    href: "#",
  },
  {
    key: "note2",
    href: "#",
  },
  {
    key: "note3",
    href: "#",
  },
]
