import { getOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { assertOffer } from '@echo/frontend/lib/helpers/offer/assert/assert-offer'
import { assertRedeemedFrom } from '@echo/frontend/lib/helpers/webhook/assert/assert-redeemed-from'
import type { ProcessEchoEventArgs } from '@echo/frontend/lib/helpers/webhook/process-echo-event'
import { processOutEscrowTransfer } from '@echo/frontend/lib/helpers/webhook/process-out-escrow-transfer'
import type { Nft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { promiseAll } from '@echo/utils/fp/promise-all'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { assoc, equals, head, ifElse, map, objOf, path, pipe, prop } from 'ramda'

export async function processEchoOfferRedeemedEvent(args: WithLoggerType<ProcessEchoEventArgs>) {
  const { logger, event } = args
  const { offerId, from } = event
  const offer = await guardAsyncFn({ fn: getOfferByIdContract, status: ErrorStatus.SERVER_ERROR, logger })(offerId)
  assertOffer(offer)
  assertRedeemedFrom(from)
  const items = ifElse<[Offer], Nft[], Nft[]>(
    pipe(prop('senderItems'), head, nonNullableReturn(path(['owner', 'wallet', 'address'])), equals(from)),
    prop('senderItems'),
    prop('receiverItems')
  )(offer)
  // Move items out of escrow
  await pipe<[Nft[]], Promise<void>[], Promise<void[]>>(
    map(pipe(objOf('nft'), assoc('logger', logger), processOutEscrowTransfer)),
    promiseAll
  )(items)
  logger?.info({ offer, from }, 'redeemed offer')
}
