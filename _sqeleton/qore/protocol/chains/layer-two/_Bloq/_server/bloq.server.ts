// TODO: Symlink this to be incorporated into web/browser/etc
// deno run --allow-read --allow-net bloq.server.ts 

import { BLOQ } from '../_utils/constants.ts'
import { apiRoutes } from '../_utils/server/api.routes.ts'
import { wsHandler } from '../_utils/server/websocket.ts'

import { createGenesisBlock } from '../_utils/chain/block.ts'

const { PORT } = BLOQ.SERVER
const server = Deno.listen({ port: PORT })
console.log(`server starting on :${PORT}....`)

const isApiRequest = (pName:string):boolean => /^\/api\/v\d+\//i.test(pName)
const isWebsocketRequest = (pName:string):boolean => /^\/ws\/?/i.test(pName)

async function requestHandler(req: Deno.RequestEvent) {
  const pathname = new URL(req.request.url).pathname
  console.log('pathname: ', pathname, 'websocket req:',isWebsocketRequest(pathname), 'api req:', isApiRequest(pathname))
  if (isWebsocketRequest(pathname)) { // pathname must begin with '/ws/'
    const { socket, response } = Deno.upgradeWebSocket(req.request);
    console.log('req.request: ', req.request)
    console.log('socket: ', socket)
    console.log('response: ', response)
    
    wsHandler(socket);
    req.respondWith(response);
  }
  else if (isApiRequest(pathname)) // pathname must begin with '/api/v#/'
    {
      const splitPath = pathname.split('/')
      splitPath.splice(0,3);
      // console.log('req.request: ', req.request)
      try {
        let apiData
        if (req.request.method === 'POST') {
          apiData = await req.request.json()
        } else {
          apiData= splitPath[1] ?? ''
        }
        // console.log('apiData: ', apiData)
        const respData = await apiRoutes[req.request.method][splitPath[0]](apiData) as any
        await req.respondWith( new Response(respData, { status: 200, headers: { 'content-type': 'application/json', }, }), )
      } catch {
        // console.log('req.request.method: ', req.request.method)
        // console.log(Object.keys(req))
        // console.log(Object.values(req))
        // console.log('req: ', req)
        // console.log('splitPath[0]: ', splitPath[0])
        // console.log('apiRoutes[req.request.method]: ', apiRoutes[req.request.method])
        // console.log('?>?>',apiRoutes[req.request.method][splitPath[0]]?.toString())
        req.respondWith(new Response('Invalid API Request', { status: 500 }))
      }
    }
  else { // file-server
    let filepath = decodeURIComponent(pathname)
    filepath = filepath === '/' ? '/index.html' : filepath
    let file
    try {
      file = await Deno.open(('./ui/' + filepath).replace('//','/'), { read: true })
    } catch {
      await req.respondWith(new Response('404 Not Found', { status: 404 }))
      return
    }
    const readableStream = file.readable // stream instead of wait for full load
    const response = new Response(readableStream)// Build and send the response
    await req.respondWith(response)
  }
}

// create initial transaction on server start
await createGenesisBlock()
for await (const conn of server) {
  (async () => {
    const httpConn = Deno.serveHttp(conn)
    for await (const requestEvent of httpConn) {
      requestHandler(requestEvent)
    }
  })()
}
