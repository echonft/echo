import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { getNftsFromIndexes } from '@echo/frontend/lib/helpers/nft/get-nfts-from-indexes'
import { assertOfferItems } from '@echo/frontend/lib/helpers/offer/assert/assert-offer-items'
import { mapReadContractOfferItemsToNftIndexes } from '@echo/frontend/lib/mappers/map-read-contract-offer-items-to-nft-indexes'
import type { BaseOffer } from '@echo/model/types/base-offer'
import type { Nft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import type { ContractOffer } from '@echo/web3/types/contract-offer'
import { applySpec, head, pipe, prop } from 'ramda'

export async function mapContractOfferToBaseOffer(
  args: WithLoggerType<Record<'contractOffer', ContractOffer>>
): Promise<BaseOffer> {
  const { logger, contractOffer } = args
  const { senderItems: contractSenderItems, receiverItems: contractReceiverItems, expiration } = contractOffer
  const senderOfferItemIndexes = await guardAsyncFn({
    fn: mapReadContractOfferItemsToNftIndexes,
    status: ErrorStatus.SERVER_ERROR,
    logger
  })({ logger, offerItems: contractSenderItems })
  const senderItems = await guardAsyncFn({
    fn: getNftsFromIndexes,
    status: ErrorStatus.SERVER_ERROR,
    logger
  })(senderOfferItemIndexes)
  assertOfferItems(senderItems)

  const receiverOfferItemIndexes = await guardAsyncFn({
    fn: mapReadContractOfferItemsToNftIndexes,
    status: ErrorStatus.SERVER_ERROR,
    logger
  })({ logger, offerItems: contractReceiverItems })
  const receiverItems = await guardAsyncFn({ fn: getNftsFromIndexes, status: ErrorStatus.SERVER_ERROR, logger })(
    receiverOfferItemIndexes
  )
  assertOfferItems(receiverItems)

  return applySpec<BaseOffer>({
    expiresAt: expiration,
    receiver: pipe<[Nft[]], Nft, User>(head, prop('owner'))(senderItems),
    receiverItems,
    sender: pipe<[Nft[]], Nft, User>(head, prop('owner'))(receiverItems),
    senderItems
  })()
}
