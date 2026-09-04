import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, _gotcha } = body;

    // Honeypot anti-spam
    if (_gotcha && String(_gotcha).trim() !== '') {
      return NextResponse.json({ success: true, message: 'Mensaje recibido.' }, { status: 200 });
    }

    // Validaciones
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Por favor ingresa tu nombre (mínimo 2 caracteres).' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Por favor ingresa un correo electrónico válido.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'El mensaje debe tener al menos 10 caracteres.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('Falta la variable de entorno RESEND_API_KEY');
      return NextResponse.json(
        {
          success: false,
          error: 'Servicio de correo no configurado. Falta la variable RESEND_API_KEY.',
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'contacto@marcoslopezsoft.dev';
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';
    const safeSubject = subject?.trim() || 'Nuevo mensaje de contacto desde el portfolio';
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();
    const timestamp = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });

    const htmlContent = `
      <div style="font-family: monospace, sans-serif; background-color: #0b0b0b; color: #f5f5f5; padding: 28px; border-radius: 6px;">
        <div style="border-bottom: 1px solid #222; padding-bottom: 16px; margin-bottom: 20px;">
          <span style="color: #ffd700; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px;">
            // NUEVO MENSAJE DESDE MARCOSLOPEZSOFT.DEV
          </span>
          <h2 style="margin: 8px 0 0; color: #ffffff; font-size: 20px;">
            ${escapeHtml(safeSubject)}
          </h2>
        </div>
        <p style="margin: 6px 0; font-size: 13px;"><strong>Remitente:</strong> ${escapeHtml(cleanName)}</p>
        <p style="margin: 6px 0; font-size: 13px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(cleanEmail)}" style="color: #ffd700;">${escapeHtml(cleanEmail)}</a></p>
        <p style="margin: 6px 0; font-size: 13px; color: #888;"><strong>Fecha:</strong> ${timestamp}</p>
        <div style="background-color: #141414; border-left: 3px solid #ffd700; padding: 18px; margin: 20px 0; border-radius: 4px;">
          <div style="color: #888; font-size: 11px; margin-bottom: 8px; text-transform: uppercase;">Mensaje:</div>
          <div style="color: #eee; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(cleanMessage)}</div>
        </div>
        <p style="font-size: 11px; color: #666; margin-top: 24px; border-top: 1px solid #1a1a1a; padding-top: 12px;">
          Responde directamente a este correo para escribirle a ${escapeHtml(cleanEmail)}.
        </p>
      </div>
    `.trim();

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [receiverEmail],
      replyTo: cleanEmail,
      subject: `[Portfolio] ${safeSubject} — ${cleanName}`,
      html: htmlContent,
      text: `Remitente: ${cleanName}\nEmail: ${cleanEmail}\nAsunto: ${safeSubject}\nFecha: ${timestamp}\n\nMensaje:\n${cleanMessage}`,
    });

    if (error) {
      console.error('Error al enviar con Resend:', error);
      return NextResponse.json(
        { success: false, error: error.message || 'Error al enviar el correo.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Mensaje enviado correctamente.', id: data?.id },
      { status: 200 }
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Error desconocido.';
    console.error('Error en /api/contact:', err);
    return NextResponse.json(
      { success: false, error: `Error en el servidor: ${errorMsg}` },
      { status: 500 }
    );
  }
}

