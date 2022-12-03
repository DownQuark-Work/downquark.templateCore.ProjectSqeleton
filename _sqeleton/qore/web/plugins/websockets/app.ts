import { Server } from "./deps.ts";

const server = new Server({
  hostname: "localhost",
  port: 1447,
  protocol: "ws",
  path: '/websocket'
});
server.run();
server.on('connect', e => {
  console.log("A new client has connected!");
  const client = server.clients.get(e.detail.id)
  if(client) client.uuid = crypto.randomUUID() // anytime uuid is used, there will be no type errors
  console.log('connected client.uuid', client?.uuid)
  server.to("landingsocket", {message: client?.uuid}, e.detail.id);
})

server.on<string>("landingsocket", (e) => {
  console.log('landing socket e', e)
  server.to("landingsocket", 'message + e.detail.id');
});
server.on<string>("exposeguid", (e) => {
  const message = e.detail.packet;
  console.log('received guid:', message)
});
