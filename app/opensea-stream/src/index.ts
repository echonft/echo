import { OpenSeaStreamClient } from '@opensea/stream-js'
import { pick } from 'ramda'
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
client.onItemTransferred('*', (event) => {
  // handle event
  if (event.payload.chain === 'blast') {
    const strippedEvent = pick(['collection', 'from_account', 'to_account', 'item'], event.payload)
    console.log(`item transferred: ${JSON.stringify(strippedEvent, undefined, 4)}`)
  }
})

client.connect()
console.log('connected')
