import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "styled-components",
        "react-dom",
        "react-icons",
        "react/jsx-runtime",
        "@inubekit/foundations",
        "@inubekit/hooks",
        "@inubekit/text",
        "@inubekit/stack",
        "@inubekit/icon",
        "@inubekit/countdownbar",
      ],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
  plugins: [react(), dts({ rollupTypes: true })],
});
