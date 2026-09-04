'use client';

import React, { useState } from 'react';
import { CONTACT_INFO } from '../data/content';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    _gotcha: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [clientError, setClientError] = useState<{ name?: string; email?: string; message?: string }>({});

  const validate = () => {
    const errors: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) {
      errors.name = 'Por favor ingresa tu nombre.';
    }
    if (!formData.email.trim()) {
      errors.email = 'Por favor ingresa tu email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Ingresa un email válido.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'El mensaje debe tener al menos 10 caracteres.';
    }
    setClientError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Ocurrió un error al enviar el mensaje.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', _gotcha: '' });
      setClientError({});
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Error al enviar el mensaje.');
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 md:px-12 xl:px-20 border-t border-current/15"
    >
      <div className="max-w-4xl mx-auto">
        {/* Encabezado */}
        <div className="mb-10 text-center sm:text-left">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ffd700] block mb-2 font-semibold">
            {'// CONTACTO DIRECTO'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-current">
            ENVIAME UN MENSAJE
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 font-light">
            Escribime para nuevos proyectos, consultas técnicas o propuestas. Tu mensaje llega directo a{' '}
            <strong className="text-white font-mono">{CONTACT_INFO.email}</strong>.
          </p>
        </div>

        {/* Tarjeta del Formulario */}
        <div className="rounded-lg border border-white/10 bg-white/2 backdrop-blur-md p-6 sm:p-10">
          {status === 'success' ? (
            <div className="py-10 text-center flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-400/40 text-emerald-400 flex items-center justify-center text-xl font-mono">
                ✓
              </div>
              <h3 className="text-xl font-bold font-mono text-white">
                MENSAJE ENVIADO CON ÉXITO
              </h3>
              <p className="text-sm text-neutral-300 max-w-md font-light">
                Gracias por escribir. El mensaje ha sido recibido y te responderé a la brevedad a tu correo.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-4 px-5 py-2 text-xs font-mono uppercase tracking-wider border border-white/20 text-white hover:border-[#ffd700] hover:text-[#ffd700] transition-colors"
              >
                [ Enviar otro mensaje ]
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              {/* Honeypot invisible */}
              <input
                type="text"
                name="_gotcha"
                value={formData._gotcha}
                onChange={(e) => setFormData({ ...formData, _gotcha: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
              />

              {status === 'error' && (
                <div className="p-4 rounded border border-red-500/40 bg-red-950/20 text-red-200 text-xs font-mono">
                  <strong>Error:</strong> {errorMessage}
                  <div className="mt-2">
                    Podés escribir directamente a{' '}
                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-[#ffd700] underline">
                      {CONTACT_INFO.email}
                    </a>.
                  </div>
                </div>
              )}

              {/* Nombre y Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-mono uppercase text-neutral-300">
                    Nombre <span className="text-[#ffd700]">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Tu nombre o empresa"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (clientError.name) setClientError({ ...clientError, name: undefined });
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-sm bg-black/40 text-white placeholder-neutral-600 font-mono text-xs border ${
                      clientError.name ? 'border-red-500' : 'border-white/10 focus:border-[#ffd700]'
                    } focus:outline-none transition-colors`}
                  />
                  {clientError.name && (
                    <span className="text-[10px] font-mono text-red-400">{clientError.name}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-mono uppercase text-neutral-300">
                    Email <span className="text-[#ffd700]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="tunombre@correo.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (clientError.email) setClientError({ ...clientError, email: undefined });
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-sm bg-black/40 text-white placeholder-neutral-600 font-mono text-xs border ${
                      clientError.email ? 'border-red-500' : 'border-white/10 focus:border-[#ffd700]'
                    } focus:outline-none transition-colors`}
                  />
                  {clientError.email && (
                    <span className="text-[10px] font-mono text-red-400">{clientError.email}</span>
                  )}
                </div>
              </div>

              {/* Asunto */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-xs font-mono uppercase text-neutral-300">
                  Asunto (Opcional)
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="Ej: Consulta sobre proyecto web"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-black/40 text-white placeholder-neutral-600 font-mono text-xs border border-white/10 focus:border-[#ffd700] focus:outline-none transition-colors"
                />
              </div>

              {/* Mensaje */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs font-mono uppercase text-neutral-300">
                  <label htmlFor="message">
                    Mensaje <span className="text-[#ffd700]">*</span>
                  </label>
                  <span className="text-[10px] text-neutral-500">{formData.message.length}/5000</span>
                </div>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Escribe aquí los detalles de tu consulta o proyecto..."
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (clientError.message) setClientError({ ...clientError, message: undefined });
                  }}
                  className={`w-full p-3.5 rounded-sm bg-black/40 text-white placeholder-neutral-600 font-mono text-xs border ${
                    clientError.message ? 'border-red-500' : 'border-white/10 focus:border-[#ffd700]'
                  } focus:outline-none transition-colors leading-relaxed`}
                />
                {clientError.message && (
                  <span className="text-[10px] font-mono text-red-400">{clientError.message}</span>
                )}
              </div>

              {/* Botón de Envío */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full mt-2 py-3.5 px-6 rounded-sm bg-[#ffd700] text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <span className="inline-block w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>ENVIANDO TRANSMISIÓN...</span>
                  </>
                ) : (
                  <span>ENVIAR MENSAJE // ↗</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
