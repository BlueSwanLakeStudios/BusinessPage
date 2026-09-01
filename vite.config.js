import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves this repo at /BusinessPage/
export default defineConfig({
  base: "/BusinessPage/",
  plugins: [react()],
});
