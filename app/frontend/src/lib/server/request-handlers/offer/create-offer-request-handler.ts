import { type ApiRequest } from '@echo/api/types/api-request'
import { type CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import { type OfferResponse } from '@echo/api/types/responses/offer-response'
import { addOffer } from '@echo/firestore/crud/offer/add-offer'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/server/helpers/error/guard'
import { guarded_assertItemsOwner } from '@echo/frontend/lib/server/helpers/item/assert/guarded_assert-items-owner'
import { guarded_assertNftOwner } from '@echo/frontend/lib/server/helpers/nft/assert/guarded_assert-nft-owner'
import { getOfferItemsFromRequests } from '@echo/frontend/lib/server/helpers/offer/get-offer-items-from-requests'
import { guarded_assertAuthUser } from '@echo/frontend/lib/server/helpers/request/assert/guarded_assert-auth-user'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { createOfferSchema } from '@echo/frontend/lib/server/validators/create-offer-schema'
import { type OfferItem } from '@echo/model/types/offer-item'
import { NextResponse } from 'next/server'
import { forEach, head } from 'ramda'

export async function createOfferRequestHandler(req: ApiRequest<CreateOfferRequest>) {
  const requestBody = await guardAsyncFn(
    (req: ApiRequest<CreateOfferRequest>) => req.json(),
    ErrorStatus.BAD_REQUEST
  )(req)
  const { receiverItems, senderItems } = guardFn(
    (requestBody) => createOfferSchema.parse(requestBody),
    ErrorStatus.BAD_REQUEST
  )(requestBody)
  const user = await getUserFromRequest(req)
  guarded_assertAuthUser(user)
  const receiverOfferItems = await guardAsyncFn(getOfferItemsFromRequests, ErrorStatus.SERVER_ERROR)(receiverItems)
  const senderOfferItems = await guardAsyncFn(getOfferItemsFromRequests, ErrorStatus.SERVER_ERROR)(senderItems)
  // make sure the sender is the owner of every item
  forEach((item: OfferItem) => {
    guarded_assertNftOwner(item.nft, user.username)
  }, senderOfferItems)

  // make sure the receiver is the owner of every item
  guarded_assertItemsOwner(receiverOfferItems, head(receiverOfferItems)!.nft.owner.username)
  const offer = await guardAsyncFn(addOffer, ErrorStatus.SERVER_ERROR)(senderOfferItems, receiverOfferItems)
  return NextResponse.json<OfferResponse>({ offer })
}
