import { type CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import { type OfferResponse } from '@echo/api/types/responses/offer-response'
import { addOffer } from '@echo/firestore/crud/offer/add-offer'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { assertNftsOwner } from '@echo/frontend/lib/helpers/nft/assert/assert-nfts-owner'
import { getEscrowedNftsFromIndexes } from '@echo/frontend/lib/helpers/nft/get-escrowed-nfts-from-indexes'
import { getNftsFromIndexes } from '@echo/frontend/lib/helpers/nft/get-nfts-from-indexes'
import type { AuthRequestHandlerArgs } from '@echo/frontend/lib/types/request-handlers/auth-request-handler'
import { createOfferSchema } from '@echo/frontend/lib/validators/create-offer-schema'
import { parseRequest } from '@echo/frontend/lib/validators/parse-request'
import { generateBaseOffer } from '@echo/model/helpers/offer/generate-base-offer'
import type { Nft } from '@echo/model/types/nft'
import { generateOfferId } from '@echo/web3/helpers/generate-offer-id'
import { NextResponse } from 'next/server'
import type { NonEmptyArray } from 'ramda'
import { head } from 'ramda'

export async function createOfferRequestHandler({ user, req, logger }: AuthRequestHandlerArgs<CreateOfferRequest>) {
  const { receiverItems, senderItems, expiresAt } = await guardAsyncFn({
    fn: parseRequest(createOfferSchema),
    logger
  })(req)
  const receiverOfferItems = await guardAsyncFn({ fn: getNftsFromIndexes, status: ErrorStatus.SERVER_ERROR, logger })(
    receiverItems
  )
  // We fetch the escrowed NFTs from the DB here because this call is done AFTER transaction has completed
  // and NFTs are thus in escrow
  const senderOfferItems = await guardAsyncFn({
    fn: getEscrowedNftsFromIndexes,
    status: ErrorStatus.SERVER_ERROR,
    logger
  })(senderItems)
  // make sure the sender and receiver are the owners of the items
  assertNftsOwner(senderOfferItems, user.username)
  assertNftsOwner(receiverOfferItems, head(receiverOfferItems as NonEmptyArray<Nft>).owner.username)
  const baseOffer = generateBaseOffer({ senderOfferItems, receiverOfferItems, expiresAt })
  const offerContractId = generateOfferId(baseOffer)
  const { data } = await guardAsyncFn({ fn: addOffer, status: ErrorStatus.SERVER_ERROR, logger })(
    baseOffer,
    offerContractId
  )
  return NextResponse.json<OfferResponse>({ offer: data })
}
