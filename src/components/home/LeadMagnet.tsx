/**
 * LeadMagnet — React Island (formulário interativo)
 * React Hook Form + Zod validation → POST para RD Station API.
 *
 * Carrega apenas onde há interatividade real (Astro Islands).
 * Não usa script RD Station no cliente — integração via API server-side.
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

// ─── Schema de validação ──────────────────────────────────────
const schema = z.object({
  company: z
    .string()
    .min(2, 'Informe o nome da empresa')
    .max(100),
  email: z
    .string()
    .email('E-mail inválido')
    .regex(
      /^(?!.*@(gmail|hotmail|yahoo|outlook|bol|uol)\.).*$/i,
      'Use um e-mail corporativo'
    ),
  role: z
    .string()
    .min(2, 'Informe seu cargo')
    .max(60),
  sector: z
    .string()
    .min(1, 'Selecione um setor'),
});

type FormData = z.infer<typeof schema>;

const sectors = [
  'Alimentícia',
  'Bebidas',
  'Laticínios',
  'Farmacêutica',
  'Automotiva',
  'Ovos e Aves',
  'Cosméticos',
  'Química / Petroquímica',
  'Embalagens',
  'Outro',
];

// ─── Componente ───────────────────────────────────────────────
export default function LeadMagnet() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus('loading');

    try {
      const res = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Erro no servidor');

      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="lead-success" role="status" aria-live="polite">
        <div className="lead-success-icon" aria-hidden="true">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="23" stroke="#22c55e" strokeWidth="2"/>
            <path d="M14 24l8 8 12-14" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="lead-success-title">Ficha técnica enviada!</h3>
        <p className="lead-success-text">
          Verifique seu e-mail corporativo. Caso não encontre,
          confira a pasta de spam.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="lead-form"
      aria-label="Formulário para download da ficha técnica CIJ Hitachi"
    >
      <div className="lead-form-grid">

        {/* Nome da Empresa */}
        <div className="lead-field">
          <label htmlFor="lm-company" className="lead-label spec">
            Nome da Empresa *
          </label>
          <input
            id="lm-company"
            type="text"
            autoComplete="organization"
            className={`lead-input ${errors.company ? 'is-error' : ''}`}
            placeholder="Ex: Empresa Alimentos Ltda"
            aria-required="true"
            aria-describedby={errors.company ? 'lm-company-error' : undefined}
            {...register('company')}
          />
          {errors.company && (
            <span id="lm-company-error" className="lead-error spec" role="alert">
              {errors.company.message}
            </span>
          )}
        </div>

        {/* E-mail */}
        <div className="lead-field">
          <label htmlFor="lm-email" className="lead-label spec">
            E-mail Corporativo *
          </label>
          <input
            id="lm-email"
            type="email"
            autoComplete="email"
            className={`lead-input ${errors.email ? 'is-error' : ''}`}
            placeholder="voce@empresa.com.br"
            aria-required="true"
            aria-describedby={errors.email ? 'lm-email-error' : undefined}
            {...register('email')}
          />
          {errors.email && (
            <span id="lm-email-error" className="lead-error spec" role="alert">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Cargo */}
        <div className="lead-field">
          <label htmlFor="lm-role" className="lead-label spec">
            Cargo *
          </label>
          <input
            id="lm-role"
            type="text"
            autoComplete="organization-title"
            className={`lead-input ${errors.role ? 'is-error' : ''}`}
            placeholder="Ex: Gerente de Produção"
            aria-required="true"
            aria-describedby={errors.role ? 'lm-role-error' : undefined}
            {...register('role')}
          />
          {errors.role && (
            <span id="lm-role-error" className="lead-error spec" role="alert">
              {errors.role.message}
            </span>
          )}
        </div>

        {/* Setor */}
        <div className="lead-field">
          <label htmlFor="lm-sector" className="lead-label spec">
            Setor Industrial *
          </label>
          <select
            id="lm-sector"
            className={`lead-input lead-select ${errors.sector ? 'is-error' : ''}`}
            aria-required="true"
            aria-describedby={errors.sector ? 'lm-sector-error' : undefined}
            {...register('sector')}
          >
            <option value="">Selecione o setor</option>
            {sectors.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.sector && (
            <span id="lm-sector-error" className="lead-error spec" role="alert">
              {errors.sector.message}
            </span>
          )}
        </div>

      </div>

      {/* Submit */}
      <div className="lead-submit-row">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="lead-submit"
          aria-busy={status === 'loading'}
        >
          {status === 'loading' ? (
            <>
              <svg className="lead-spinner" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2" strokeDasharray="32" strokeDashoffset="12"/>
              </svg>
              Enviando…
            </>
          ) : (
            <>
              Baixar Ficha Técnica
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M9 3v9M5 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 14h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </>
          )}
        </button>

        <p className="lead-privacy spec">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <rect x="2" y="6" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M5 6V4.5a2 2 0 014 0V6" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
          Enviamos apenas conteúdo técnico relevante. Sem spam. LGPD compliant.
        </p>
      </div>

      {status === 'error' && (
        <div className="lead-error-msg spec" role="alert">
          Erro ao enviar. Tente novamente ou ligue para (54) XXXX-XXXX.
        </div>
      )}
    </form>
  );
}
