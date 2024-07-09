import { acceptOffer } from '@echo/firestore/crud/offer/accept-offer'
import { getOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { NotFoundError } from '@echo/frontend/lib/helpers/error/not-found-error'
import type { ProcessEchoEventArgs } from '@echo/frontend/lib/helpers/webhook/process-echo-event'
import { processInEscrowTransfer } from '@echo/frontend/lib/helpers/webhook/process-in-escrow-transfer'
import type { Nft } from '@echo/model/types/nft'
import { promiseAll } from '@echo/utils/fp/promise-all'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { assoc, isNil, map, objOf, pipe } from 'ramda'

export async function processEchoOfferAcceptedEvent(args: WithLoggerType<ProcessEchoEventArgs>) {
  const { event } = args
  const { offerId } = event
  const offer = await getOfferByIdContract(offerId)
  if (isNil(offer)) {
    return Promise.reject(new NotFoundError({ message: 'offer not found', severity: 'warning' }))
  }
  // Move all receiver items to escrow
  await pipe<[Nft[]], Promise<void>[], Promise<void[]>>(
    map(pipe(objOf('nft'), assoc('logger', args.logger), processInEscrowTransfer)),
    promiseAll
  )(offer.receiverItems)
  await acceptOffer({ slug: offer.slug })
  args.logger?.info({ offer }, 'accepted offer')
}
