import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createCatFactsApiHandler } from "./src/server/catFactsApi.js";

function catFactsApiPlugin() {
  return {
    name: "cat-facts-api",
    configureServer(server) {
      const handler = createCatFactsApiHandler();
      server.middlewares.use("/api/cat-facts", (req, res) => handler(req, res));
    }
  };
}

export default defineConfig({
  plugins: [react(), catFactsApiPlugin()]
});
