import { assertOwnerOfOfferItems } from '@echo/api/helpers/assert-owner-of-offer-items'
import { getViemClient } from '@echo/api/services/viem/get-viem-client'
import { ApiRequest } from '@echo/api/types/api-request'
import { type OfferResponse } from '@echo/api/types/responses/offer-response'
import { assertOffer } from '@echo/frontend/lib/server/helpers/offer/assert/assert-offer'
import { assertOfferIsOpen } from '@echo/frontend/lib/server/helpers/offer/assert/assert-offer-is-open'
import { assertOfferReceiverOrSenderIs } from '@echo/frontend/lib/server/helpers/offer/assert/assert-offer-receiver-or-sender-is'
import { cancelOffer } from '@echo/frontend/lib/server/helpers/offer/cancel-offer'
import { getOffer } from '@echo/frontend/lib/server/helpers/offer/get-offer'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { assertOfferItemsAreSameChain } from '@echo/model/helpers/offer/assert/assert-offer-items-are-same-chain'
import { NextResponse } from 'next/server'
import { assoc } from 'ramda'

export async function getOfferRequestHandler(req: ApiRequest<never>, id: string) {
  const user = await getUserFromRequest(req)
  let offer = await getOffer(id)
  assertOffer(offer)
  assertOfferReceiverOrSenderIs(offer, user.username)
  // We only invalidate offers that are still open
  if (assertOfferIsOpen(offer)) {
    try {
      assertOfferItemsAreSameChain(offer.senderItems.concat(offer.receiverItems))
      // We can take any items, we asserted there all on the same chain
      const chainId = offer.senderItems[0]!.nft.collection.contract.chainId
      const client = getViemClient(chainId)
      await assertOwnerOfOfferItems(client, offer.sender.wallet.address, offer.senderItems)
      await assertOwnerOfOfferItems(client, offer.receiver.wallet.address, offer.receiverItems)
    } catch {
      await cancelOffer(id)
      offer = assoc('state', 'CANCELLED', offer)
    }
  }
  return NextResponse.json<OfferResponse>({ offer })
}
