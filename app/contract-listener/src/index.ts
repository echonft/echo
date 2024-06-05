import { handleErc721TransferEvent } from '@echo/contract-listener/handlers/handle-erc721-transfer-event'
import { handleOfferExecutedEvent } from '@echo/contract-listener/handlers/handle-offer-executed-event'
import { guardAsyncFn } from '@echo/contract-listener/helpers/guard'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { getSupportedChains } from '@echo/utils/helpers/chains/get-supported-chains'
import { getClientForChain } from '@echo/web3/helpers/get-client-for-chain'
import { watchOfferExecutedEvents } from '@echo/web3/watchers/echo/watch-offer-executed-events'
import { watchErc721TransferEvents } from '@echo/web3/watchers/erc721/watch-erc721-transfer-events'

initializeFirebase()
for (const chain of getSupportedChains()) {
  console.log(`Watching events on ${chain}`)
  const client = getClientForChain(chain)
  watchOfferExecutedEvents({ client, handler: guardAsyncFn({ fn: handleOfferExecutedEvent }) })
  watchErc721TransferEvents({ client, handler: guardAsyncFn({ fn: handleErc721TransferEvent }) })
}

// Keep the process running indefinitely
process.stdin.resume()
