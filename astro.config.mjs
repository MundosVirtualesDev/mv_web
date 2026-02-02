import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://example.com",
  output: "hybrid",
  server: {
    port: 4321
  }
});
