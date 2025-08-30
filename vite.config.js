import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ⚠️ remplace 'REPO' par le nom exact du dépôt GitHub
export default defineConfig({
  plugins: [react()],
  base: "/NovaTrend/",
});
