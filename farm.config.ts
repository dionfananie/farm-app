import path from "path";
import { defineConfig } from "@farmfe/core";
import { middleware } from "./src/server/middleware";

export default defineConfig({
  compilation: {
    input: {
      index_client: "./index.html",
    },
    output: {
      path: "./build",
    },
  },
  server: {
    hmr: true,
    cors: true,
    middlewares: middleware,
  },
  plugins: ["@farmfe/plugin-react", "@farmfe/plugin-sass"],
});
