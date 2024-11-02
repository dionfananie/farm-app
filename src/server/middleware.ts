import type { Server } from "@farmfe/core";
import path from "path";

function serverMiddleware(server: Server) {
  server
    .app()
    .use(
      async (
        ctx: { path: string; status: number; body: string; type: string },
        next: () => any
      ) => {
        await next();
        console.log("mode: ", process.env.NODE_ENV);

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
            "<!-- app-html-to-replace -->",
            renderedHtml
          );
          ctx.body = html;
          ctx.type = "text/html";
          ctx.status = 200;
        }

        console.log("ssr updated", ctx.path);
      }
    );
}

export const middleware = [
  // register a middleware that render the application on the server,
  // inject server rendered markup and return final index.html
  serverMiddleware,
];
