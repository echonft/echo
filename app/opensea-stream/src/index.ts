import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { parseEventPayload } from '@echo/opensea-stream/helpers/parse-event-payload'
import { processInTransfer } from '@echo/opensea-stream/helpers/process-in-transfer'
import { processOutTransfer } from '@echo/opensea-stream/helpers/process-out-transfer'
import { processSwapTransfer } from '@echo/opensea-stream/helpers/process-swap-transfer'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { OpenSeaStreamClient } from '@opensea/stream-js'
import { isNil, pipe, prop } from 'ramda'
import { WebSocket } from 'ws'

class InMemoryStorage {
  private readonly storage: Map<string, string>

  constructor() {
    this.storage = new Map()
  }

  getItem(keyName: string) {
    return this.storage.get(keyName)
  }

  removeItem(keyName: string) {
    this.storage.delete(keyName)
  }

  setItem(keyName: string, keyValue: string) {
    this.storage.set(keyName, keyValue)
  }
}

const client = new OpenSeaStreamClient({
  token: process.env.OPEN_SEA_API_KEY,
  connectOptions: {
    sessionStorage: new InMemoryStorage(),
    transport: WebSocket
  }
})
client.onItemTransferred('*', async (event) => {
  const data = await pipe(prop('payload'), parseEventPayload)(event)
  // If data is nil, no need to do anything
  if (isNil(data)) {
    return
  }
  const { from, to, nftIndex } = data
  // Process event
  if (isNil(to)) {
    await processOutTransfer(nftIndex)
  } else if (isNil(from)) {
    await processInTransfer(to, nftIndex)
  } else {
    await processSwapTransfer(to, nftIndex)
  }
})

initializeFirebase()
client.connect()
pinoLogger.info('connected')
// Keep the process running indefinitely
process.stdin.resume()
