import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // host: "94.130.57.216",
    host: "10.0.60.43",
    port: "4173",
    // port: "4173",
  },
});
