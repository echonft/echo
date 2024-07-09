import { getOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { BadRequestError } from '@echo/frontend/lib/helpers/error/bad-request-error'
import { NotFoundError } from '@echo/frontend/lib/helpers/error/not-found-error'
import type { ProcessEchoEventArgs } from '@echo/frontend/lib/helpers/webhook/process-echo-event'
import { processOutEscrowTransfer } from '@echo/frontend/lib/helpers/webhook/process-out-escrow-transfer'
import type { Nft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { promiseAll } from '@echo/utils/fp/promise-all'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { assoc, equals, head, ifElse, isNil, map, objOf, path, pipe, prop } from 'ramda'

export async function processEchoOfferRedeemedEvent(args: WithLoggerType<ProcessEchoEventArgs>) {
  const { logger, event } = args
  const { offerId, from } = event
  if (isNil(from)) {
    return Promise.reject(new BadRequestError({ message: '"from" prop is nil', severity: 'error' }))
  }
  const offer = await getOfferByIdContract(offerId)
  if (isNil(offer)) {
    return Promise.reject(new NotFoundError({ message: 'offer not found', severity: 'warning' }))
  }
  // Move items out of escrow
  await pipe<[Offer], Nft[], Promise<void>[], Promise<void[]>>(
    ifElse<[Offer], Nft[], Nft[]>(
      pipe(prop('senderItems'), head, nonNullableReturn(path(['owner', 'wallet', 'address'])), equals(from)),
      prop('senderItems'),
      prop('receiverItems')
    ),
    map(pipe(objOf('nft'), assoc('logger', logger), processOutEscrowTransfer)),
    promiseAll
  )(offer)
  logger?.info({ offer, from }, 'redeemed offer')
}
