import { acceptOffer } from '@echo/firestore/crud/offer/accept-offer'
import { getOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { BadRequestError } from '@echo/frontend/lib/helpers/error/bad-request-error'
import { NotFoundError } from '@echo/frontend/lib/helpers/error/not-found-error'
import type { ProcessEchoEventArgs } from '@echo/frontend/lib/helpers/webhook/process-echo-event'
import { processInEscrowTransfer } from '@echo/frontend/lib/helpers/webhook/process-in-escrow-transfer'
import type { Nft } from '@echo/model/types/nft'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { assoc, isNil, objOf, pipe } from 'ramda'

export async function processEchoOfferAcceptedEvent(args: WithLoggerType<ProcessEchoEventArgs>) {
  const { event } = args
  const { offerId } = event
  const offer = await getOfferByIdContract(offerId)
  if (isNil(offer)) {
    return Promise.reject(new NotFoundError({ message: 'offer not found', severity: 'warning' }))
  }
  if (offer.readOnly) {
    return Promise.reject(
      new BadRequestError({
        message: 'received Echo offer accepted event, but the offer is read only',
        severity: 'warning'
      })
    )
  }
  // Move all receiver items to escrow
  for (const item of offer.receiverItems) {
    await pipe<[Nft], Record<'nft', Nft>, WithLoggerType<Record<'nft', Nft>>, Promise<void>>(
      objOf('nft'),
      assoc('logger', args.logger),
      processInEscrowTransfer
    )(item)
  }
  await acceptOffer({ slug: offer.slug })
  args.logger?.info({ offer }, 'accepted offer')
}
