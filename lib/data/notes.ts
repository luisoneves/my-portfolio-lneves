export interface NoteData {
  key: "note1" | "note2" | "note3"
  href?: string
}

export const notesData: NoteData[] = [
  { key: "note1", href: "#" },
  { key: "note2", href: "#" },
  { key: "note3", href: "#" },
]
