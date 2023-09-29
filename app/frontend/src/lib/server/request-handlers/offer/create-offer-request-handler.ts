import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import { GetOfferResponse } from '@echo/api/types/responses/get-offer-response'
import { FirestoreOfferItem } from '@echo/firestore/types/model/offer/firestore-offer-item'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { assertNftOwner } from '@server/helpers/nft/assert-nft-owner'
import { createOffer } from '@server/helpers/offer/create-offer'
import { getOfferItems } from '@server/helpers/offer/get-offer-items'
import { getUserFromRequest } from '@server/helpers/request/get-user-from-request'
import { mapOfferToResponse } from '@server/mappers/to-response/map-offer-to-response'
import { createOfferSchema } from '@server/validators/create-offer-schema'
import { NextResponse } from 'next/server'
import { forEach } from 'ramda'

export async function createOfferRequestHandler(req: ApiRequest<CreateOfferRequest>) {
  const requestBody = await req.json()
  const { receiverItems, senderItems } = parseCreateOfferRequest(requestBody)
  const sender = await getUserFromRequest(req)
  const receiverOfferItems = await getOfferItems(receiverItems)
  const senderOfferItems = await getOfferItems(senderItems)
  // make sure the receiver is the owner of every item
  forEach((item: FirestoreOfferItem) => {
    assertNftOwner(item.nft, sender.username)
  }, senderOfferItems)
  const createdOffer = await createOffer(senderOfferItems, receiverOfferItems)
  return NextResponse.json<GetOfferResponse>({ offer: mapOfferToResponse(createdOffer) })
}

function parseCreateOfferRequest(request: CreateOfferRequest) {
  try {
    return createOfferSchema.parse(request)
  } catch (e) {
    throw new BadRequestError(`error parsing create offer request ${JSON.stringify(request)}`, e)
  }
}
