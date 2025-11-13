import { createServer } from "./app";

async function start() {
  const server = await createServer();
  await server.listen(process.env.PORT);
}

start().catch(console.error);
