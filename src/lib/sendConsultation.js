// =====================================================================
// sendConsultation
// ---------------------------------------------------------------------
// Envía la solicitud del formulario de consulta al backend .NET propio
// (POST /api/contact). El backend valida el payload y delega el envío
// del email a Web3Forms (u otro proveedor en el futuro), manteniendo
// la API key fuera del bundle del navegador.
//
// En desarrollo (npm run dev), Vite proxea /api → http://localhost:5000
// donde corre el proyecto .NET (vite.config.js).
// =====================================================================

const ENDPOINT = '/api/contact';

export async function sendConsultation(formData) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    // Intenta extraer un mensaje útil del backend (ProblemDetails o JSON)
    let detail = `HTTP ${res.status}`;
    try {
      const errBody = await res.json();
      detail = errBody.detail || errBody.title || JSON.stringify(errBody);
    } catch {
      /* respuesta no JSON */
    }
    throw new Error(`Envío fallido: ${detail}`);
  }

  return res.json();
}
