import { BadRequestError } from '@echo/frontend/lib/helpers/error/bad-request-error'
import { getNftsFromIndexes } from '@echo/frontend/lib/helpers/nft/get-nfts-from-indexes'
import { mapReadContractOfferItemsToNftIndexes } from '@echo/frontend/lib/mappers/map-read-contract-offer-items-to-nft-indexes'
import type { BaseOffer } from '@echo/model/types/base-offer'
import type { Nft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import type { ContractOffer } from '@echo/web3/types/contract-offer'
import { head, pipe, prop } from 'ramda'

export async function mapContractOfferToBaseOffer(
  args: WithLoggerType<Record<'contractOffer', ContractOffer>>
): Promise<BaseOffer> {
  const { logger, contractOffer } = args
  const { senderItems: contractSenderItems, receiverItems: contractReceiverItems, expiration } = contractOffer
  const senderOfferItemIndexes = await mapReadContractOfferItemsToNftIndexes({ logger, items: contractSenderItems })
  const senderItems = await getNftsFromIndexes(senderOfferItemIndexes)
  if (isNilOrEmpty(senderItems)) {
    return Promise.reject(new BadRequestError({ message: 'sender items not found', severity: 'warning' }))
  }
  const receiverOfferItemIndexes = await mapReadContractOfferItemsToNftIndexes({ logger, items: contractReceiverItems })
  const receiverItems = await getNftsFromIndexes(receiverOfferItemIndexes)
  if (isNilOrEmpty(receiverItems)) {
    return Promise.reject(new BadRequestError({ message: 'receiver items not found', severity: 'warning' }))
  }
  return {
    expiresAt: expiration,
    receiver: pipe<[Nft[]], Nft, User>(head, prop('owner'))(receiverItems),
    receiverItems,
    sender: pipe<[Nft[]], Nft, User>(head, prop('owner'))(senderItems),
    senderItems
  }
}
