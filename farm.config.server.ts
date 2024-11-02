import { defineConfig } from "@farmfe/core";

export default defineConfig({
  server: {
    port: 3000,
  },
  compilation: {
    input: {
      index: "./src/index-server.tsx",
    },
    output: {
      path: "./dist",
      targetEnv: "node",
      format: "cjs",
      publicPath: "/",
    },

    assets: {
      mode: "browser",
    },

    // external: [...builtinModules.map((m) => `^${m}$`)],
    css: {
      prefixer: {
        targets: ["last 2 versions", "Firefox ESR", "> 1%", "ie >= 11"],
      },
    },
  },
  plugins: [
    [
      "@farmfe/plugin-react",
      {
        refresh: false,
        development: false,
      },
    ],
    "@farmfe/plugin-sass",
  ],
});
