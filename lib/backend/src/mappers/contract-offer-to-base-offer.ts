import { BadRequestError } from '@echo/backend/errors/bad-request-error'
import { contractOfferItemsToErc721Items } from '@echo/backend/mappers/contract-offer-items-to-erc721-items'
import type { Erc721ItemWithOwner } from '@echo/backend/types/erc721-item-with-owner'
import type { BaseOffer } from '@echo/model/types/base-offer'
import type { User } from '@echo/model/types/user'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { nonEmptyMap } from '@echo/utils/fp/non-empty-map'
import type { ContractOffer } from '@echo/web3/types/contract-offer'
import { dissoc, head, type NonEmptyArray, pipe, prop } from 'ramda'

export async function contractOfferToBaseOffer(contractOffer: ContractOffer): Promise<BaseOffer> {
  const { senderItems: contractSenderItems, receiverItems: contractReceiverItems, expiration } = contractOffer
  const senderItems = await contractOfferItemsToErc721Items(contractSenderItems)
  if (!isNonEmptyArray(senderItems)) {
    return Promise.reject(new BadRequestError({ severity: 'warning' }))
  }
  const receiverItems = await contractOfferItemsToErc721Items(contractReceiverItems)
  if (!isNonEmptyArray(receiverItems)) {
    return Promise.reject(new BadRequestError({ severity: 'warning' }))
  }
  const receiver = pipe<[NonEmptyArray<Erc721ItemWithOwner>], Erc721ItemWithOwner, User>(
    head,
    prop('owner')
  )(receiverItems)
  const sender = pipe<[NonEmptyArray<Erc721ItemWithOwner>], Erc721ItemWithOwner, User>(head, prop('owner'))(senderItems)
  return {
    expiresAt: expiration,
    receiver,
    receiverItems: nonEmptyMap(dissoc('owner'), receiverItems),
    sender,
    senderItems: nonEmptyMap(dissoc('owner'), senderItems)
  }
}
