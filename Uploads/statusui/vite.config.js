import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

const pages = [
  "index",
  "account",
  "group-form",
  "groups",
  "jobs",
  "maintenance",
  "submission-details",
  "user-details",
  "user-form",
  "users",
];

export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((page) => [page, resolve(__dirname, `${page}.html`)])
      ),
    },
  },
});
