import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://example.com",
  output: "static",
  server: {
    port: 4321
  }
});
