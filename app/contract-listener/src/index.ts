import { contractListenerLogger } from '@echo/contract-listener/constants/contract-listener-logger'
import { handleErc721TransferEvent } from '@echo/contract-listener/handlers/handle-erc721-transfer-event'
import { handleOfferExecutedEvent } from '@echo/contract-listener/handlers/handle-offer-executed-event'
import { guardAsyncFn } from '@echo/contract-listener/helpers/guard'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { getSupportedChains } from '@echo/utils/helpers/chains/get-supported-chains'
import { getClientForChain } from '@echo/web3/helpers/chain/get-client-for-chain'
import { watchOfferExecutedEvents } from '@echo/web3/watchers/echo/watch-offer-executed-events'
import { watchErc721TransferEvents } from '@echo/web3/watchers/erc721/watch-erc721-transfer-events'

await initializeFirebase()
for (const chain of getSupportedChains()) {
  const client = await getClientForChain(chain)
  watchOfferExecutedEvents({ client, handler: guardAsyncFn({ fn: handleOfferExecutedEvent }) })
  watchErc721TransferEvents({ client, handler: guardAsyncFn({ fn: handleErc721TransferEvent }) })
  contractListenerLogger.info({ msg: `Watching events on ${chain}` })
}

// Keep the process running indefinitely
process.stdin.resume()
