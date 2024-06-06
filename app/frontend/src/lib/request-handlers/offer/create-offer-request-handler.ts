import { type ApiRequest } from '@echo/api/types/api-request'
import { type CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import { type OfferResponse } from '@echo/api/types/responses/offer-response'
import { addOffer } from '@echo/firestore/crud/offer/add-offer'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/helpers/error/guard'
import { assertNftsOwner } from '@echo/frontend/lib/helpers/nft/assert/assert-nfts-owner'
import { getEscrowedNftsFromIndexes } from '@echo/frontend/lib/helpers/nft/get-escrowed-nfts-from-indexes'
import { getNftsFromIndexes } from '@echo/frontend/lib/helpers/nft/get-nfts-from-indexes'
import { createOfferSchema } from '@echo/frontend/lib/validators/create-offer-schema'
import { generateBaseOffer } from '@echo/model/helpers/offer/generate-base-offer'
import type { Nft } from '@echo/model/types/nft'
import { generateOfferId } from '@echo/web3/helpers/generate-offer-id'
import { NextResponse } from 'next/server'
import type { User } from 'next-auth'
import type { NonEmptyArray } from 'ramda'
import { head } from 'ramda'

export async function createOfferRequestHandler(user: User, req: ApiRequest<CreateOfferRequest>) {
  const requestBody = await guardAsyncFn(
    (req: ApiRequest<CreateOfferRequest>) => req.json(),
    ErrorStatus.BAD_REQUEST
  )(req)
  const { receiverItems, senderItems, expiresAt } = guardFn(
    (requestBody) => createOfferSchema.parse(requestBody),
    ErrorStatus.BAD_REQUEST
  )(requestBody)

  const receiverOfferItems = await guardAsyncFn(getNftsFromIndexes, ErrorStatus.SERVER_ERROR)(receiverItems)
  // We fetch the escrowed NFTs from the DB here because this call is done AFTER transaction has completed
  // and NFTs are thus in escrow
  const senderOfferItems = await guardAsyncFn(getEscrowedNftsFromIndexes, ErrorStatus.SERVER_ERROR)(senderItems)
  // make sure the sender and receiver are the owners of the items
  assertNftsOwner(senderOfferItems, user.username)
  assertNftsOwner(receiverOfferItems, head(receiverOfferItems as NonEmptyArray<Nft>).owner.username)
  const baseOffer = generateBaseOffer({ senderOfferItems, receiverOfferItems, expiresAt })
  const offerContractId = generateOfferId(baseOffer)
  const { data } = await guardAsyncFn(addOffer, ErrorStatus.SERVER_ERROR)(baseOffer, offerContractId)
  return NextResponse.json<OfferResponse>({ offer: data })
}
