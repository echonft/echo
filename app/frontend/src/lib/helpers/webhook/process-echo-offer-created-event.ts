import { addOffer } from '@echo/firestore/crud/offer/add-offer'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import type { ProcessEchoEventArgs } from '@echo/frontend/lib/helpers/webhook/process-echo-event'
import { processInEscrowTransfer } from '@echo/frontend/lib/helpers/webhook/process-in-escrow-transfer'
import { mapContractOfferToBaseOffer } from '@echo/frontend/lib/mappers/map-contract-offer-to-base-offer'
import type { Nft } from '@echo/model/types/nft'
import { promiseAll } from '@echo/utils/fp/promise-all'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { getEchoOffer } from '@echo/web3/helpers/get-echo-offer'
import { assoc, map, objOf, pipe } from 'ramda'

export async function processEchoOfferCreatedEvent(args: WithLoggerType<ProcessEchoEventArgs>) {
  const { logger, event, chain } = args
  const { offerId } = event
  const contractOffer = await guardAsyncFn({ fn: getEchoOffer, status: ErrorStatus.SERVER_ERROR, logger })({
    chain,
    offerId
  })
  const baseOffer = await guardAsyncFn({ fn: mapContractOfferToBaseOffer, status: ErrorStatus.SERVER_ERROR, logger })({
    logger,
    contractOffer
  })
  // Move all sender items to escrow
  await pipe<[Nft[]], Promise<void>[], Promise<void[]>>(
    map(pipe(objOf('nft'), assoc('logger', logger), processInEscrowTransfer)),
    promiseAll
  )(baseOffer.senderItems)
  const offer = await guardAsyncFn({ fn: addOffer, status: ErrorStatus.SERVER_ERROR, logger })(baseOffer, offerId)
  logger?.info({ offer }, 'created offer')
}
