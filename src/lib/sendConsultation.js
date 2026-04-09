// =====================================================================
// sendConsultation
// ---------------------------------------------------------------------
// Envía la solicitud del formulario de consulta a consultas@tusplacasseguras.com
//
// Implementación inicial: Web3Forms (https://web3forms.com)
//   - Servicio gratuito, no requiere backend.
//   - Crea una cuenta gratis y obtén tu Access Key.
//   - Pon la key en .env como: VITE_WEB3FORMS_KEY=xxxxxxxx
//   - Web3Forms entregará el email a la dirección configurada en tu cuenta
//     (configúrala como consultas@tusplacasseguras.com).
//
// TODO: Si el equipo prefiere un backend .NET propio, reemplaza la URL
//       y el body por una llamada al endpoint correspondiente.
// =====================================================================

const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

export async function sendConsultation(formData) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

  // Modo desarrollo sin key configurada: simula éxito tras 800ms
  // para que el equipo pueda probar el flujo del formulario.
  if (!accessKey) {
    console.warn(
      '[sendConsultation] VITE_WEB3FORMS_KEY no configurada. Simulando envío.'
    );
    await new Promise((r) => setTimeout(r, 800));
    return { ok: true, simulated: true };
  }

  const payload = {
    access_key: accessKey,
    subject: `Nueva consulta solar — ${formData.name}`,
    from_name: 'Tus Placas Seguras (Sitio Web)',
    // Estos campos llegarán al email destino
    nombre: formData.name,
    telefono: formData.phone,
    email: formData.email,
    pueblo: formData.town,
    tipo_consulta: formData.type === 'home' ? 'Visita a mi hogar' : 'Por teléfono',
    mejor_horario: formData.time,
    mensaje: formData.message || '(sin mensaje)',
  };

  const res = await fetch(WEB3FORMS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Web3Forms error: ${res.status}`);
  }

  const json = await res.json();
  if (!json.success) {
    throw new Error(json.message || 'Envío fallido');
  }

  return { ok: true };
}
