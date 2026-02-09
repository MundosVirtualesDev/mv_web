import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://mundosvirtualesdev.github.io",
  base: "/mv_web/",
  output: "static",
  prerender: true, // <- fuerza SSG para todo
  server: {
    port: 4321
  }
});
