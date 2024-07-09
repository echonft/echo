import { addOffer } from '@echo/firestore/crud/offer/add-offer'
import { NotFoundError } from '@echo/frontend/lib/helpers/error/not-found-error'
import type { ProcessEchoEventArgs } from '@echo/frontend/lib/helpers/webhook/process-echo-event'
import { processInEscrowTransfer } from '@echo/frontend/lib/helpers/webhook/process-in-escrow-transfer'
import { mapContractOfferToBaseOffer } from '@echo/frontend/lib/mappers/map-contract-offer-to-base-offer'
import type { Nft } from '@echo/model/types/nft'
import { promiseAll } from '@echo/utils/fp/promise-all'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { getEchoOffer } from '@echo/web3/helpers/get-echo-offer'
import { assoc, isNil, map, objOf, pipe } from 'ramda'

export async function processEchoOfferCreatedEvent(args: WithLoggerType<ProcessEchoEventArgs>) {
  const { logger, event, chain } = args
  const { offerId } = event
  const contractOffer = await getEchoOffer({
    chain,
    offerId
  })
  if (isNil(contractOffer)) {
    return Promise.reject(new NotFoundError({ message: 'contract offer not found', severity: 'warning' }))
  }
  const baseOffer = await mapContractOfferToBaseOffer({
    logger,
    contractOffer
  })
  // Move all sender items to escrow
  await pipe<[Nft[]], Promise<void>[], Promise<void[]>>(
    map(pipe(objOf('nft'), assoc('logger', logger), processInEscrowTransfer)),
    promiseAll
  )(baseOffer.senderItems)
  const offer = await addOffer(baseOffer, offerId)
  logger?.info({ offer }, 'created offer')
}
