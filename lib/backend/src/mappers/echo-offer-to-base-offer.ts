import { getCollectionByContract } from '@echo/firestore/crud/collection/get-collection-by-contract'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getUserByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import { CollectionError } from '@echo/model/constants/errors/collection-error'
import { NftError } from '@echo/model/constants/errors/nft-error'
import { erc721NftToItem } from '@echo/model/mappers/nft/erc721-nft-to-item'
import type { Erc721Item } from '@echo/model/types/item'
import type { Erc721Nft } from '@echo/model/types/nft'
import type { BaseOffer } from '@echo/model/types/offer'
import type { User } from '@echo/model/types/user'
import { nonEmptyMap } from '@echo/utils/helpers/non-empty-map'
import { nonEmptyPromiseAll } from '@echo/utils/helpers/non-empty-promise-all'
import type { EchoOffer } from '@echo/web3/types/echo-offer'
import { assoc, dissoc, isNil, path, pipe } from 'ramda'

type EchoOfferItems = EchoOffer['senderItems']
type EchoOfferItem = EchoOfferItems['items'][number]

interface Erc721ItemWithOwner extends Erc721Item {
  owner: User
}

// TODO add ERC20 and ERC1155
async function contractOfferItemToErc721Item(item: EchoOfferItem, owner: User): Promise<Erc721ItemWithOwner> {
  const { tokenAddress, tokenIdOrAmount } = item
  const collection = await getCollectionByContract(tokenAddress)
  if (isNil(collection)) {
    return Promise.reject(Error(CollectionError.NotFound))
  }
  const nft = await getNftByIndex({ collection, tokenId: tokenIdOrAmount })
  if (isNil(nft)) {
    return Promise.reject(Error(NftError.NotFound))
  }
  return pipe(erc721NftToItem, assoc('owner', owner))(nft as Erc721Nft)
}

export async function echoOfferToBaseOffer(contractOffer: EchoOffer): Promise<BaseOffer> {
  const receiver = await getUserByWallet(contractOffer.receiver)
  const sender = await getUserByWallet(contractOffer.sender)

  if (isNil(receiver) || isNil(sender)) {
    return Promise.reject(Error('Users not found'))
  }

  const receiverItems = await pipe(
    path<EchoOffer, 'receiverItems', 'items'>(['receiverItems', 'items']),
    nonEmptyMap((item) => contractOfferItemToErc721Item(item, receiver)),
    nonEmptyPromiseAll<Erc721ItemWithOwner>
  )(contractOffer)

  const senderItems = await pipe(
    path<EchoOffer, 'senderItems', 'items'>(['senderItems', 'items']),
    nonEmptyMap((item) => contractOfferItemToErc721Item(item, sender)),
    nonEmptyPromiseAll<Erc721ItemWithOwner>
  )(contractOffer)

  return {
    expiresAt: contractOffer.expiration,
    receiver,
    receiverItems: nonEmptyMap(dissoc('owner'), receiverItems),
    sender,
    senderItems: nonEmptyMap(dissoc('owner'), senderItems)
  }
}
