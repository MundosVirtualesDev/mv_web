type GuardOptions = {
  formSelector: string;
  honeypotName: string;
  minSecondsBetweenSends: number;
  storageKey?: string;
};

export function mountContactGuard(opts: GuardOptions) {
  const form = document.querySelector<HTMLFormElement>(opts.formSelector);
  if (!form) return;

  const key = opts.storageKey ?? "mv_contact_last_send";
  const hp = form.querySelector<HTMLInputElement>(`input[name="${opts.honeypotName}"]`);

  form.addEventListener("submit", (ev) => {
    // honeypot
    if (hp && hp.value.trim().length > 0) {
      ev.preventDefault();
      return;
    }

    // rate-limit (frontend)
    const now = Date.now();
    const last = Number(localStorage.getItem(key) ?? "0");
    const minMs = opts.minSecondsBetweenSends * 1000;

    if (last && now - last < minMs) {
      ev.preventDefault();
      alert(`Por favor espera ${Math.ceil((minMs - (now - last)) / 1000)}s antes de enviar nuevamente.`);
      return;
    }

    localStorage.setItem(key, String(now));
  });
}
