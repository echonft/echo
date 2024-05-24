import { cleanEventPayload } from '@echo/opensea-stream/helpers/clean-event-payload'
import { processFromTransfer } from '@echo/opensea-stream/helpers/process-from-transfer'
import { processSwapTransfer } from '@echo/opensea-stream/helpers/process-swap-transfer'
import { processToTransfer } from '@echo/opensea-stream/helpers/process-to-transfer'
import { OpenSeaStreamClient } from '@opensea/stream-js'
import { isNil } from 'ramda'
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
  const { payload } = event
  const cleanedData = await cleanEventPayload(payload)
  // If data is nil, no need to do anything
  if (isNil(cleanedData)) {
    return
  }

  const { from, to, nftIndex } = cleanedData

  // Process event
  if (isNil(to)) {
    await processFromTransfer(nftIndex)
  } else if (isNil(from)) {
    await processToTransfer(to, nftIndex)
  } else {
    await processSwapTransfer(to, nftIndex)
  }
})

client.connect()
console.log('connected')
