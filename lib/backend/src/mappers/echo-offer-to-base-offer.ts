import { BadRequestError } from '@echo/backend/errors/bad-request-error'
import { NotFoundError } from '@echo/backend/errors/not-found-error'
import { getCollectionByAddress } from '@echo/firestore/crud/collection/get-collection-by-address'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import type { Chain } from '@echo/model/constants/chain'
import { CollectionError } from '@echo/model/constants/errors/collection-error'
import { NftError } from '@echo/model/constants/errors/nft-error'
import { chainById } from '@echo/model/helpers/chain/chain-by-id'
import { isOwnedNft } from '@echo/model/helpers/nft/is-owned-nft'
import { erc721NftToItem } from '@echo/model/mappers/nft/erc721-nft-to-item'

import type { Erc721Item } from '@echo/model/types/item'

import type { OwnedErc721Nft } from '@echo/model/types/nft'
import type { BaseOffer } from '@echo/model/types/offer'
import type { UserWithWallet } from '@echo/model/types/user'
import { isNonEmptyArray } from '@echo/utils/helpers/is-non-empty-array'
import { nonEmptyMap } from '@echo/utils/helpers/non-empty-map'
import { nonEmptyPromiseAll } from '@echo/utils/helpers/non-empty-promise-all'
import type { EchoOffer } from '@echo/web3/types/echo-offer'
import { assoc, dissoc, head, isNil, type NonEmptyArray, pipe, prop } from 'ramda'

type EchoOfferItems = EchoOffer['senderItems']
type EchoOfferItem = EchoOfferItems['items'][number]

interface Erc721ItemWithOwner extends Erc721Item {
  owner: UserWithWallet
}

// TODO add ERC20 and ERC1155
export async function contractOfferItemToErc721Item(
  item: EchoOfferItem & Record<'chain', Chain>
): Promise<Erc721ItemWithOwner> {
  const { chain, tokenAddress, tokenId } = item
  const collection = await getCollectionByAddress({ address: tokenAddress, chain })
  if (isNil(collection)) {
    return Promise.reject(new NotFoundError({ message: CollectionError.NotFound, severity: 'warning' }))
  }
  const nft = await getNftByIndex({ collection, tokenId })
  if (isNil(nft)) {
    return Promise.reject(new NotFoundError({ message: NftError.NotFound, severity: 'warning' }))
  }
  if (!isOwnedNft(nft)) {
    return Promise.reject(new BadRequestError({ message: NftError.NoOwner, severity: 'warning' }))
  }
  // FIXME until the contract supports ERC1155, we can assume this
  return pipe(erc721NftToItem, assoc('owner', (nft as OwnedErc721Nft).owner))(nft as OwnedErc721Nft)
}

// TODO add ERC20 and ERC1155
export function contractOfferItemsToErc721Items(items: EchoOfferItems): Promise<NonEmptyArray<Erc721ItemWithOwner>> {
  const chain = pipe(prop('chainId'), chainById)(items)
  return pipe(
    prop('items'),
    nonEmptyMap(pipe(assoc('chain', chain), contractOfferItemToErc721Item)),
    nonEmptyPromiseAll
  )(items)
}

export async function echoOfferToBaseOffer(contractOffer: EchoOffer): Promise<BaseOffer> {
  const { senderItems: contractSenderItems, receiverItems: contractReceiverItems, expiration } = contractOffer
  const senderItems = await contractOfferItemsToErc721Items(contractSenderItems)
  if (!isNonEmptyArray(senderItems)) {
    return Promise.reject(new BadRequestError({ severity: 'warning' }))
  }
  const receiverItems = await contractOfferItemsToErc721Items(contractReceiverItems)
  if (!isNonEmptyArray(receiverItems)) {
    return Promise.reject(new BadRequestError({ severity: 'warning' }))
  }
  const receiver = pipe<[NonEmptyArray<Erc721ItemWithOwner>], Erc721ItemWithOwner, UserWithWallet>(
    head,
    prop('owner')
  )(receiverItems)
  const sender = pipe<[NonEmptyArray<Erc721ItemWithOwner>], Erc721ItemWithOwner, UserWithWallet>(
    head,
    prop('owner')
  )(senderItems)
  return {
    expiresAt: expiration,
    receiver,
    receiverItems: nonEmptyMap(dissoc('owner'), receiverItems),
    sender,
    senderItems: nonEmptyMap(dissoc('owner'), senderItems)
  }
}
