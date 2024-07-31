import { BadRequestError } from '@echo/frontend/lib/helpers/error/bad-request-error'
import { getNftsFromIndexes } from '@echo/frontend/lib/helpers/nft/get-nfts-from-indexes'
import { mapReadContractOfferItemsToNftIndexes } from '@echo/frontend/lib/mappers/map-read-contract-offer-items-to-nft-indexes'
import { isOwnedNft } from '@echo/model/helpers/nft/is-owned-nft'
import type { BaseOffer } from '@echo/model/types/base-offer'
import type { OwnedNft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import type { ContractOffer } from '@echo/web3/types/contract-offer'
import { andThen, filter, head, type NonEmptyArray, pipe, prop } from 'ramda'

export async function mapContractOfferToBaseOffer(
  args: WithLoggerType<Record<'contractOffer', ContractOffer>>
): Promise<BaseOffer> {
  const { logger, contractOffer } = args
  const { senderItems: contractSenderItems, receiverItems: contractReceiverItems, expiration } = contractOffer
  const senderItems = await pipe(
    mapReadContractOfferItemsToNftIndexes,
    andThen(pipe(getNftsFromIndexes, andThen(filter(isOwnedNft))))
  )({ logger, items: contractSenderItems })
  if (!isNonEmptyArray(senderItems)) {
    return Promise.reject(new BadRequestError({ message: 'sender items not found', severity: 'warning' }))
  }
  const receiverItems = await pipe(
    mapReadContractOfferItemsToNftIndexes,
    andThen(pipe(getNftsFromIndexes, andThen(filter(isOwnedNft))))
  )({ logger, items: contractReceiverItems })
  if (!isNonEmptyArray(receiverItems)) {
    return Promise.reject(new BadRequestError({ message: 'receiver items not found', severity: 'warning' }))
  }
  return {
    expiresAt: expiration,
    receiver: pipe<[NonEmptyArray<OwnedNft>], OwnedNft, User>(head, prop('owner'))(receiverItems),
    receiverItems,
    sender: pipe<[NonEmptyArray<OwnedNft>], OwnedNft, User>(head, prop('owner'))(senderItems),
    senderItems
  }
}
