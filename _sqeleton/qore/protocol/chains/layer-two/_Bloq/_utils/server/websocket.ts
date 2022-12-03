// https://github.com/denoland/deno_std/blob/main/examples/chat/index.html

const clients = new Map<number, WebSocket>();
let clientId = 0;
function dispatch(msg: string) {
  for (const client of clients.values()) {
    client.send(msg);
  }
}

export const wsHandler = (ws: WebSocket) => {
  const id = ++clientId;
  clients.set(id, ws);
  ws.onopen = () => {
    dispatch(`Connected: [${id}]`);
  };
  ws.onmessage = (e) => {
    console.log(`msg:${id}`, e.data);
    // ws.send('confirmation of message delivery:\n\tWe received your message! You sent: ${e.data}')
    dispatch(`[${id}]: ${e.data}`);
  };
  ws.onclose = () => {
    clients.delete(id);
    dispatch(`Closed: [${id}]`);
  };
}
