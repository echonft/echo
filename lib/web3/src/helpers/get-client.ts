import { createPublicClient, fallback, http, webSocket } from 'viem'
import { sei } from 'viem/chains'

export function getClient() {
  return createPublicClient({
    chain: sei,
    transport: fallback([webSocket('wss://evm-ws.sei-apis.com'), http('https://evm-rpc.sei-apis.com')], {
      rank: true,
      retryCount: 10,
      retryDelay: 1200
    })
  })
}
