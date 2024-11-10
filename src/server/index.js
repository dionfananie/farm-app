const path = require("path");
const fsp = require("fs/promises");
const Fastify = require("fastify");

function resolve(p) {
  return path.resolve(p);
}

async function createServer() {
  const fastify = Fastify({ logger: true });

  // Serve static files from the 'build' directory
  fastify.register(require("@fastify/static"), {
    root: resolve("build"),
  });

  // Route handler for all incoming requests
  fastify.get("/", async (request, reply) => {
    const url = request.raw.url;

    try {
      const template = await fsp.readFile(
        resolve("build/index_client.html"),
        "utf8"
      );
      const serverEntry = resolve("dist/index.js");
      const render = require(serverEntry);

      const renderedHtml = render(url);
      console.log(renderedHtml);

      const html = template.replace(
        "<!-- app-html-to-replace -->",
        renderedHtml
      );
      console.log(template.includes("<!-- app-html-to-replace -->"));
      console.log(html.includes("<!-- app-html-to-replace -->"));

      reply.header("Content-Type", "text/html");
      reply.status(200).send(html);
    } catch (error) {
      console.error(error.stack);
      reply.status(500).send(error.stack);
    }
  });

  return fastify;
}

createServer().then((fastify) => {
  const port = process.env.FARM_DEFAULT_SERVER_PORT || 3000;
  fastify.listen({ port }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`HTTP server is running at ${address}`);
  });
});
