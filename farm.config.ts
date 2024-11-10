import { defineConfig } from "@farmfe/core";
import { middleware } from "./src/server/middleware";
import farmPluginPostcss from "@farmfe/js-plugin-postcss";
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
  plugins: ["@farmfe/plugin-react", "@farmfe/plugin-sass", farmPluginPostcss()],
});
