import { BadRequestError } from '@echo/backend/errors/bad-request-error'
import { NotFoundError } from '@echo/backend/errors/not-found-error'
import { getCollectionByContract } from '@echo/firestore/crud/collection/get-collection-by-contract'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { CollectionError } from '@echo/model/constants/errors/collection-error'
import { NftError } from '@echo/model/constants/errors/nft-error'
import { isOwnedNft } from '@echo/model/helpers/nft/is-owned-nft'
import { erc721NftToItem } from '@echo/model/mappers/nft/erc721-nft-to-item'
import type { Erc721Item } from '@echo/model/types/item'
import type { OwnedErc721Nft } from '@echo/model/types/nft'
import type { BaseOffer } from '@echo/model/types/offer'
import type { User } from '@echo/model/types/user'
import { nonEmptyMap } from '@echo/utils/helpers/non-empty-map'
import { nonEmptyPromiseAll } from '@echo/utils/helpers/non-empty-promise-all'
import type { EchoOffer } from '@echo/web3/types/echo-offer'
import { assoc, dissoc, head, isNil, type NonEmptyArray, path, pipe, prop } from 'ramda'

type EchoOfferItems = EchoOffer['senderItems']
type EchoOfferItem = EchoOfferItems['items'][number]

interface Erc721ItemWithOwner extends Erc721Item {
  owner: User & Required<Pick<User, 'wallet'>>
}

// TODO add ERC20 and ERC1155
export async function contractOfferItemToErc721Item(item: EchoOfferItem): Promise<Erc721ItemWithOwner> {
  const { tokenAddress, tokenIdOrAmount } = item
  const collection = await getCollectionByContract(tokenAddress)
  if (isNil(collection)) {
    return Promise.reject(new NotFoundError({ message: CollectionError.NotFound, severity: 'warning' }))
  }
  const nft = await getNftByIndex({ collection, tokenId: tokenIdOrAmount })
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
export async function echoOfferToBaseOffer(contractOffer: EchoOffer): Promise<BaseOffer> {
  const receiverItems = await pipe(
    path<EchoOffer, 'receiverItems', 'items'>(['receiverItems', 'items']),
    nonEmptyMap(contractOfferItemToErc721Item),
    nonEmptyPromiseAll<Erc721ItemWithOwner>
  )(contractOffer)
  const senderItems = await pipe(
    path<EchoOffer, 'senderItems', 'items'>(['senderItems', 'items']),
    nonEmptyMap(contractOfferItemToErc721Item),
    nonEmptyPromiseAll<Erc721ItemWithOwner>
  )(contractOffer)
  const receiver = pipe<
    [NonEmptyArray<Erc721ItemWithOwner>],
    Erc721ItemWithOwner,
    User & Required<Pick<User, 'wallet'>>
  >(
    head,
    prop('owner')
  )(receiverItems)
  const sender = pipe<[NonEmptyArray<Erc721ItemWithOwner>], Erc721ItemWithOwner, User & Required<Pick<User, 'wallet'>>>(
    head,
    prop('owner')
  )(senderItems)
  return {
    expiresAt: contractOffer.expiration,
    receiver,
    receiverItems: nonEmptyMap(dissoc('owner'), receiverItems),
    sender,
    senderItems: nonEmptyMap(dissoc('owner'), senderItems)
  }
}
