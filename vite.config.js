// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // âš ï¸ nom EXACT du repo + slash au dÃ©but ET Ã  la fin
  base: "/NovaTrend/",
});
