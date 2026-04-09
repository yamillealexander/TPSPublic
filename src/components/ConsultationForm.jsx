import { useState } from 'react';
import { consultation } from '../data/content';
import { sendConsultation } from '../lib/sendConsultation';

const initialState = {
  name: '',
  phone: '',
  email: '',
  town: '',
  type: 'phone',
  time: '',
  message: '',
};

export default function ConsultationForm() {
  const f = consultation.fields;
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  function update(key, value) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function validate() {
    const e = {};
    if (!data.name.trim())  e.name  = 'Requerido';
    if (!data.phone.trim()) e.phone = 'Requerido';
    if (!data.email.trim()) e.email = 'Requerido';
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = 'Email inválido';
    if (!data.town.trim())  e.town  = 'Requerido';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    try {
      await sendConsultation(data);
      setStatus('success');
      setData(initialState);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  return (
    <section id="consulta" className="section bg-white">
      <div className="container-page max-w-3xl">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-700">
            {consultation.eyebrow}
          </span>
          <h2 className="section-heading mt-3">{consultation.title}</h2>
          <p className="section-subheading">{consultation.subtitle}</p>
        </div>

        {status === 'success' ? (
          <div className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
            <div className="text-5xl mb-3">✅</div>
            <h3 className="text-xl font-bold text-green-900 mb-2">{consultation.successTitle}</h3>
            <p className="text-green-800">{consultation.successBody}</p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            noValidate
            className="bg-slate-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-slate-100 shadow-sm grid sm:grid-cols-2 gap-4 sm:gap-5"
          >
            <Field label={f.name.label} error={errors.name}>
              <input
                type="text"
                value={data.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder={f.name.placeholder}
                className={inputCls(errors.name)}
              />
            </Field>

            <Field label={f.phone.label} error={errors.phone}>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder={f.phone.placeholder}
                className={inputCls(errors.phone)}
              />
            </Field>

            <Field label={f.email.label} error={errors.email}>
              <input
                type="email"
                value={data.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder={f.email.placeholder}
                className={inputCls(errors.email)}
              />
            </Field>

            <Field label={f.town.label} error={errors.town}>
              <input
                type="text"
                value={data.town}
                onChange={(e) => update('town', e.target.value)}
                placeholder={f.town.placeholder}
                className={inputCls(errors.town)}
              />
            </Field>

            <fieldset className="sm:col-span-2">
              <legend className="block text-sm font-semibold text-slate-700 mb-2">
                {f.type.label}
              </legend>
              <div className="grid sm:grid-cols-2 gap-3">
                {f.type.options.map((opt) => {
                  const checked = data.type === opt.value;
                  return (
                    <label
                      key={opt.value}
                      className={`cursor-pointer rounded-xl border-2 p-4 transition ${
                        checked
                          ? 'border-brand-900 bg-brand-50'
                          : 'border-slate-200 bg-white hover:border-brand-500'
                      }`}
                    >
                      <input
                        type="radio"
                        name="type"
                        value={opt.value}
                        checked={checked}
                        onChange={(e) => update('type', e.target.value)}
                        className="sr-only"
                      />
                      <span className="font-semibold text-slate-900">{opt.label}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <Field label={f.time.label} className="sm:col-span-2">
              <input
                type="text"
                value={data.time}
                onChange={(e) => update('time', e.target.value)}
                placeholder={f.time.placeholder}
                className={inputCls()}
              />
            </Field>

            <Field label={f.message.label} className="sm:col-span-2">
              <textarea
                rows={4}
                value={data.message}
                onChange={(e) => update('message', e.target.value)}
                placeholder={f.message.placeholder}
                className={inputCls() + ' resize-none'}
              />
            </Field>

            <div className="sm:col-span-2">
              {status === 'error' && (
                <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
                  <strong>{consultation.errorTitle}.</strong> {consultation.errorBody}
                </div>
              )}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-accent w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? consultation.submitting : consultation.submit}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({ label, error, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-sm font-semibold text-slate-700 mb-2">{label}</span>
      {children}
      {error && <span className="block text-xs text-red-600 mt-1">{error}</span>}
    </label>
  );
}

function inputCls(error) {
  return `w-full rounded-xl border bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:outline-none focus:ring-2 focus:ring-brand-500 ${
    error ? 'border-red-400' : 'border-slate-200'
  }`;
}
