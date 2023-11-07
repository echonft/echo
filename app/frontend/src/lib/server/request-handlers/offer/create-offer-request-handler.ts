import { type ApiRequest } from '@echo/api/types/api-request'
import { type CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import { type OfferResponse } from '@echo/api/types/responses/offer-response'
import { BadRequestError } from '@echo/frontend/lib/server/helpers/error/bad-request-error'
import { guarded_assertNftOwner } from '@echo/frontend/lib/server/helpers/nft/assert/guarded_assert-nft-owner'
import { guarded_addOffer } from '@echo/frontend/lib/server/helpers/offer/guarded_add-offer'
import { guarded_getOfferItemsFromRequests } from '@echo/frontend/lib/server/helpers/offer/guarded_get-offer-items-from-requests'
import { guarded_getResquestBody } from '@echo/frontend/lib/server/helpers/request/guarded_get-resquest-body'
import { guarded_getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/guarded_get-user-from-request'
import { createOfferSchema } from '@echo/frontend/lib/server/validators/create-offer-schema'
import { type OfferItem } from '@echo/model/types/offer-item'
import { NextResponse } from 'next/server'
import { forEach, head } from 'ramda'

function guarded_parseCreateOfferRequest(request: CreateOfferRequest) {
  try {
    return createOfferSchema.parse(request)
  } catch (e) {
    throw new BadRequestError(`error parsing create offer request ${JSON.stringify(request)}`, e)
  }
}

export async function createOfferRequestHandler(req: ApiRequest<CreateOfferRequest>) {
  const requestBody = await guarded_getResquestBody(req)
  const { receiverItems, senderItems } = guarded_parseCreateOfferRequest(requestBody)
  const sender = await guarded_getUserFromRequest(req)
  const receiverOfferItems = await guarded_getOfferItemsFromRequests(receiverItems)
  const senderOfferItems = await guarded_getOfferItemsFromRequests(senderItems)
  // make sure the sender is the owner of every item
  forEach((item: OfferItem) => {
    guarded_assertNftOwner(item.nft, sender.username)
  }, senderOfferItems)

  // make sure the receiver is the owner of every item
  const receiver = head(receiverOfferItems)!.nft.owner
  forEach((item: OfferItem) => {
    guarded_assertNftOwner(item.nft, receiver.username)
  }, receiverOfferItems)
  const offer = await guarded_addOffer(senderOfferItems, receiverOfferItems)
  return NextResponse.json<OfferResponse>({ offer })
}
