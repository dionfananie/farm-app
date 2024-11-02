import path from "path";
import { defineConfig } from "@farmfe/core";

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
    middlewares: [
      // register a middleware that render the application on the server,
      // inject server rendered markup and return final index.html
      (server) => {
        server
          .app()
          .use(
            async (
              ctx: { path: string; status: number; body: string; type: string },
              next: () => any
            ) => {
              await next();

              // handle index.html or SPA fallback
              if (ctx.path === "/" || ctx.status === 404) {
                // loading the server entry, and render it by ctx.path
                const render = await import(
                  path.join(process.cwd(), "dist", "index.js")
                ).then((m) => m.default);
                const renderedHtml = render(ctx.path);

                // get compiled index.html content from server.getCompiler()
                // The html is compiled for client with all client bundles injected
                const template = server
                  .getCompiler()
                  .resource("index_client.html")
                  .toString();

                // replace the placeholder to rendered markup and return it as html
                const html = template.replace(
                  "{app-html-to-replace}",
                  renderedHtml
                );
                ctx.body = html;
                ctx.type = "text/html";
                ctx.status = 200;
              }

              console.log("ctx.path outer", ctx.path);
            }
          );
      },
    ],
  },
  plugins: ["@farmfe/plugin-react", "@farmfe/plugin-sass"],
});
