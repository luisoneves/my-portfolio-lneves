"use server"
import { Resend } from "resend"
import { z } from "zod"

const resend = new Resend(process.env.RESEND_API_KEY)

const ContactSchema = z.object({
  name:    z.string().min(2).max(100),
  email:   z.string().email(),
  subject: z.enum(["work", "freelance", "tech", "other"]),
  message: z.string().min(10).max(2000),
})

const subjectLabels: Record<string, string> = {
  work:      "Oportunidade de trabalho",
  freelance: "Projeto freelance",
  tech:      "Conversa técnica",
  other:     "Outro",
}

export async function sendContactEmail(data: unknown) {
  const parsed = ContactSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: "Dados inválidos." }
  }

  const { name, email, subject, message } = parsed.data
  const subjectLabel = subjectLabels[subject] ?? subject
  const toEmails = process.env.CONTACT_TO_EMAIL?.split(",").map(e => e.trim()) ?? ["1991lotavion@gmail.com"]

  try {
    await resend.emails.send({
      from:    "Portfolio <contato@dev-luisneves.me>",
      to:      toEmails,
      replyTo: email,
      subject: `[Portfolio] ${subjectLabel} — ${name}`,
      html: `
        <div style="font-family:monospace;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#1a1a1a;margin-bottom:16px">Nova mensagem via portfolio</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
            <tr><td style="padding:6px 0;color:#666;width:100px">Nome</td><td style="padding:6px 0">${name}</td></tr>
            <tr><td style="padding:6px 0;color:#666">Email</td><td style="padding:6px 0"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:6px 0;color:#666">Assunto</td><td style="padding:6px 0">${subjectLabel}</td></tr>
          </table>
          <div style="background:#faeeda;border-radius:8px;padding:16px;border-left:3px solid #d97706">
            <p style="margin:0;white-space:pre-wrap;color:#333">${message}</p>
          </div>
          <p style="color:#999;font-size:12px;margin-top:16px">Enviado via dev-luisneves.me</p>
        </div>
      `,
    })

    await resend.emails.send({
      from:    "Luis Neves <contato@dev-luisneves.me>",
      to:      [email],
      subject: "Recebi sua mensagem!",
      html: `
        <div style="font-family:monospace;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#1a1a1a">Olá, ${name}!</h2>
          <p style="color:#444;line-height:1.6">Recebi sua mensagem e responderei em até 48 horas.</p>
          <div style="background:#faeeda;border-radius:8px;padding:16px;margin:16px 0;border-left:3px solid #d97706">
            <p style="margin:0;color:#854f0b;font-size:14px;font-style:italic">"${message.slice(0, 150)}${message.length > 150 ? "..." : ""}"</p>
          </div>
          <p style="color:#444">Até logo,<br><strong>Luis Neves</strong></p>
          <p style="color:#999;font-size:12px">dev-luisneves.me</p>
        </div>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error("[sendContactEmail]", error)
    return { success: false, error: "Erro ao enviar email." }
  }
}
