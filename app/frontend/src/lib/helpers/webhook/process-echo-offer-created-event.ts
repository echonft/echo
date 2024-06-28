import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { addOffer } from '@echo/firestore/crud/offer/add-offer'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { getEscrowedNftsFromIndexesWithRetry } from '@echo/frontend/lib/helpers/nft/get-escrowed-nfts-from-indexes-with-retry'
import { getNftsFromIndexes } from '@echo/frontend/lib/helpers/nft/get-nfts-from-indexes'
import type { ProcessEchoEventArgs } from '@echo/frontend/lib/helpers/webhook/process-echo-event'
import { mapReadContractOfferItemsToNftIndexes } from '@echo/frontend/lib/mappers/map-read-contract-offer-items-to-nft-indexes'
import { generateBaseOffer } from '@echo/model/helpers/offer/generate-base-offer'
import type { ErrorResponse } from '@echo/utils/types/error-response'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { getEchoOffer } from '@echo/web3/helpers/get-echo-offer'
import { NextResponse } from 'next/server'
import { isEmpty } from 'ramda'

export async function processEchoOfferCreatedEvent(args: WithLoggerType<ProcessEchoEventArgs>) {
  const { logger, event, chain } = args
  const { offerId } = event
  const contractOffer = await getEchoOffer({ chain, offerId })
  const { senderItems, receiverItems, expiration } = contractOffer

  const senderOfferItemIndexes = await guardAsyncFn({
    fn: mapReadContractOfferItemsToNftIndexes,
    status: ErrorStatus.SERVER_ERROR,
    logger
  })({ logger, offerItems: senderItems })
  // TODO We should review this flow. Since this is triggered on an Echo event (in this case it's offer created)
  // we could run into a race condition where the transfer in escrow method wasn't called first. We want to give us some
  // leway and allow a few retries to make sure the escrowed NFT is done properly
  const senderOfferItems = await guardAsyncFn({
    fn: getEscrowedNftsFromIndexesWithRetry,
    status: ErrorStatus.SERVER_ERROR,
    logger
  })({ logger, indexes: senderOfferItemIndexes })
  // TODO Clean that call
  if (isEmpty(senderOfferItems)) {
    return NextResponse.json<ErrorResponse>({ error: 'sender NFTs not found' })
  }

  const receiverOfferItemIndexes = await guardAsyncFn({
    fn: mapReadContractOfferItemsToNftIndexes,
    status: ErrorStatus.SERVER_ERROR,
    logger
  })({ logger, offerItems: receiverItems })
  const receiverOfferItems = await guardAsyncFn({ fn: getNftsFromIndexes, status: ErrorStatus.SERVER_ERROR, logger })(
    receiverOfferItemIndexes
  )
  // TODO Clean that call
  if (isEmpty(receiverOfferItems)) {
    return NextResponse.json<ErrorResponse>({ error: 'receiver NFTs not found' })
  }

  const baseOffer = generateBaseOffer({ senderOfferItems, receiverOfferItems, expiresAt: expiration })
  const { data } = await guardAsyncFn({ fn: addOffer, status: ErrorStatus.SERVER_ERROR, logger })(baseOffer, offerId)
  return NextResponse.json<OfferResponse>({ offer: data })
}
