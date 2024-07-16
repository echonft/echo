import { addOffer } from '@echo/firestore/crud/offer/add-offer'
import { NotFoundError } from '@echo/frontend/lib/helpers/error/not-found-error'
import type { ProcessEchoEventArgs } from '@echo/frontend/lib/helpers/webhook/process-echo-event'
import { processInEscrowTransfer } from '@echo/frontend/lib/helpers/webhook/process-in-escrow-transfer'
import { mapContractOfferToBaseOffer } from '@echo/frontend/lib/mappers/map-contract-offer-to-base-offer'
import type { Nft } from '@echo/model/types/nft'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { getEchoOffer } from '@echo/web3/helpers/get-echo-offer'
import { assoc, isNil, objOf, pipe } from 'ramda'

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
  for (const item of baseOffer.senderItems) {
    await pipe<[Nft], Record<'nft', Nft>, WithLoggerType<Record<'nft', Nft>>, Promise<void>>(
      objOf('nft'),
      assoc('logger', args.logger),
      processInEscrowTransfer
    )(item)
  }
  const offer = await addOffer(baseOffer, offerId)
  logger?.info({ offer }, 'created offer')
}
