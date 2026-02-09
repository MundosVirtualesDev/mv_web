export function mountReveal() {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
  if (!nodes.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add("is-visible");
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12 }
  );

  nodes.forEach((n) => io.observe(n));
}
