import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // host: "192.168.10.103",
    host: "192.168.10.26",
    port: "4173",
    // port: "4173",
  },
});