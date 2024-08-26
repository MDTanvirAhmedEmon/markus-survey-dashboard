import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
<<<<<<< HEAD
    host: "192.168.10.205",
=======
    host: "192.168.10.6",
>>>>>>> cb1c193e652e6531f1f1c5e3d20ba591d3b42233
    port: "3001",
  },
});