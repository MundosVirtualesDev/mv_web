export const prerender = false;

// Rate limit simple en memoria (ok para dev / server único).
// En serverless, esto NO es confiable porque puede reiniciarse por instancia.
const bucket = new Map<string, { count: number; resetAt: number }>();

function getIP(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return "local";
}

function tooMany(ip: string) {
  const now = Date.now();
  const windowMs = 60_000; // 1 min
  const limit = 8;         // 8 req/min por IP
  const entry = bucket.get(ip);

  if (!entry || now > entry.resetAt) {
    bucket.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }
  entry.count += 1;
  bucket.set(ip, entry);
  return entry.count > limit;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST({ request }: { request: Request }) {
  const ip = getIP(request);
  if (tooMany(ip)) {
    return new Response(JSON.stringify({ error: "Demasiadas solicitudes. Intenta en un minuto." }), {
      status: 429,
      headers: { "content-type": "application/json" }
    });
  }

  const form = await request.formData();

  // Honeypot: si viene relleno -> bot
  const company = String(form.get("company") ?? "");
  if (company.trim().length > 0) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  }

  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const message = String(form.get("message") ?? "").trim();

  if (name.length < 2 || !isValidEmail(email) || message.length < 10) {
    return new Response(JSON.stringify({ error: "Datos inválidos. Revisa nombre/correo/mensaje." }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }

  // TODO: Conectar a email/CRM (SendGrid/Mailgun/SMTP/DB)
  console.log("[CONTACT]", { ip, name, email, message });

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "content-type": "application/json" }
  });
}
