import { defineConfig } from "vite";
import path from "path";
import dts from "vite-plugin-dts";

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "object-key-convert",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "umd", "cjs"],
    },
  },
  plugins: [
    dts({
      outputDir: "dist/",
      insertTypesEntry: true,
    }),
  ],
});
