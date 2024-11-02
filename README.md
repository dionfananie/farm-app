# Farm React SSR Example

React + React Router + SSR.

## Tech Stack

**Server:** Node, Fastify, Typescript

## Start

```sh
bun start; # start the client dev server
bun start:server; # compile and watch the server procution in development mode
```

Then visit `http://localhost:9000`.

## Build For Production

Build for both client and server.

```sh
npm run build && npm run build:server
```

then launch the production server:

```sh
NODE_ENV=production node server.js
```

Visit `http://localhost:3000`
