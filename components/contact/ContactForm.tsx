"use client"
import { useState } from "react"
import { toast } from "sonner"
import { sendContactEmail } from "@/app/actions/sendContact"

interface ContactFormProps {
  locale: string
}

type FormState = {
  name: string
  email: string
  subject: string
  message: string
}

export function ContactForm({ locale }: ContactFormProps) {
  const isEn = locale === "en"
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "work",
    message: "",
  })

  const subjects = isEn
    ? [
        { value: "work",      label: "Work opportunity" },
        { value: "freelance", label: "Freelance project" },
        { value: "tech",      label: "Tech conversation" },
        { value: "other",     label: "Other" },
      ]
    : [
        { value: "work",      label: "Oportunidade de trabalho" },
        { value: "freelance", label: "Projeto freelance" },
        { value: "tech",      label: "Conversa técnica" },
        { value: "other",     label: "Outro" },
      ]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error(
        isEn
          ? "Please fill all required fields."
          : "Preencha todos os campos obrigatórios."
      )
      return
    }
    setLoading(true)
    const result = await sendContactEmail(form)
    setLoading(false)
    if (result.success) {
      toast.success(
        isEn
          ? "Message sent! I'll reply within 48h."
          : "Mensagem enviada! Respondo em até 48h."
      )
      setForm({ name: "", email: "", subject: "work", message: "" })
    } else {
      toast.error(
        isEn
          ? "Something went wrong. Try again."
          : "Algo deu errado. Tente novamente."
      )
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-highlight">
      <p className="section-label mb-4" style={{ color: "var(--amber-brand)" }}>
        {isEn
          ? "// send a message"
          : "// envie uma mensagem — respondo por email"}
      </p>

      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">{isEn ? "name *" : "nome *"}</label>
          <input
            type="text"
            className="form-input"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder={isEn ? "Your name" : "Seu nome"}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">email *</label>
          <input
            type="email"
            className="form-input"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="seu@email.com"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">{isEn ? "subject" : "assunto"}</label>
        <select
          className="form-input"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        >
          {subjects.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">{isEn ? "message *" : "mensagem *"}</label>
        <textarea
          className="form-input"
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder={
            isEn
              ? "Tell me about your project or opportunity..."
              : "Me conta sobre o projeto ou oportunidade..."
          }
          required
          style={{ resize: "vertical" }}
        />
      </div>

      <input
        type="text"
        name="_honey"
        style={{ display: "none" }}
        tabIndex={-1}
        aria-hidden="true"
      />

      <div className="flex justify-between items-center mt-2 flex-wrap gap-3">
        <span className="p3">
          {isEn ? "No spam · Reply within 48h" : "Sem spam · Respondo em até 48h"}
        </span>
        <button
          type="submit"
          className="btn-primary"
          disabled={loading}
        >
          {loading
            ? isEn ? "Sending..." : "Enviando..."
            : isEn ? "Send message ↗" : "Enviar mensagem ↗"}
        </button>
      </div>
    </form>
  )
}
