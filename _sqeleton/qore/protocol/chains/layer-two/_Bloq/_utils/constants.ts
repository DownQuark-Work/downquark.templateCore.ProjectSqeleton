export const DOWNQUARK_BLOQCHAIN = 'DOWNQUARK_BLOQCHAIN'
export const BLOQ = {
  CHAIN: {},
  SERVER: {
    PORT: 8080,
    WS_PATH: '/ws/',
    WS_URL:'',
  },
}

BLOQ.SERVER.WS_URL = `ws://localhost:${BLOQ.SERVER.PORT}${BLOQ.SERVER.WS_PATH}`