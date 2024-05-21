import { type ApiRequest } from '@echo/api/types/api-request'
import { type CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import { type OfferResponse } from '@echo/api/types/responses/offer-response'
import { addOffer } from '@echo/firestore/crud/offer/add-offer'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/helpers/error/guard'
import { assertItemsOwner } from '@echo/frontend/lib/helpers/item/assert/assert-items-owner'
import { assertNftOwner } from '@echo/frontend/lib/helpers/nft/assert/assert-nft-owner'
import { generateBaseOffer } from '@echo/frontend/lib/helpers/offer/generate-base-offer'
import { getOfferItemsFromRequests } from '@echo/frontend/lib/helpers/offer/get-offer-items-from-requests'
import { createOfferSchema } from '@echo/frontend/lib/validators/create-offer-schema'
import type { AuthUser } from '@echo/model/types/auth-user'
import { type OfferItem } from '@echo/model/types/offer-item'
import { generateOfferId } from '@echo/web3/helpers/generate-offer-id'
import { NextResponse } from 'next/server'
import { forEach, head } from 'ramda'

export async function createOfferRequestHandler(user: AuthUser, req: ApiRequest<CreateOfferRequest>) {
  const requestBody = await guardAsyncFn(
    (req: ApiRequest<CreateOfferRequest>) => req.json(),
    ErrorStatus.BAD_REQUEST
  )(req)
  const { receiverItems, senderItems, expiresAt } = guardFn(
    (requestBody) => createOfferSchema.parse(requestBody),
    ErrorStatus.BAD_REQUEST
  )(requestBody)
  const receiverOfferItems = await guardAsyncFn(getOfferItemsFromRequests, ErrorStatus.SERVER_ERROR)(receiverItems)
  const senderOfferItems = await guardAsyncFn(getOfferItemsFromRequests, ErrorStatus.SERVER_ERROR)(senderItems)
  // make sure the sender is the owner of every item
  forEach((item: OfferItem) => {
    assertNftOwner(item.nft, user.username)
  }, senderOfferItems)

  // make sure the receiver is the owner of every item
  assertItemsOwner(receiverOfferItems, head(receiverOfferItems)!.nft.owner.username)
  const baseOffer = generateBaseOffer({ senderOfferItems, receiverOfferItems, expiresAt })
  const offerContractId = generateOfferId(baseOffer)
  const offer = await guardAsyncFn(addOffer, ErrorStatus.SERVER_ERROR)(baseOffer, offerContractId)
  return NextResponse.json<OfferResponse>({ offer })
}
