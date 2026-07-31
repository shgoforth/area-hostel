// Standard Vite configuration for AREA Hostel.
// This project uses Vite with React, Tailwind CSS, and TypeScript path aliases.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
});
