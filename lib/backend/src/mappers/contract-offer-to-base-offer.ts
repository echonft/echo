import { BadRequestError } from '@echo/backend/errors/bad-request-error'
import { getCollectionByAddress } from '@echo/firestore/crud/collection/get-collection-by-address'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getNftsOwner } from '@echo/model/helpers/nft/get-nfts-owner'
import { isOwnedNft } from '@echo/model/helpers/nft/is-owned-nft'
import type { Nft } from '@echo/model/types/nft/nft'
import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import type { BaseOffer } from '@echo/model/types/offer/base-offer'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { getChain } from '@echo/utils/helpers/chains/get-chain'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { ContractOffer } from '@echo/web3/types/contract-offer'
import type { ContractOfferItem } from '@echo/web3/types/contract-offer-item'
import type { ContractOfferItems } from '@echo/web3/types/contract-offer-items'
import { always, andThen, assoc, filter, isNil, map, otherwise, pipe, prop } from 'ramda'

async function contractOfferItemToNft(item: ContractOfferItem & Record<'chain', ChainName>): Promise<Nft> {
  const { chain, tokenAddress, tokenId } = item
  const collection = await getCollectionByAddress({ address: tokenAddress, chain })
  if (isNil(collection)) {
    return Promise.reject(Error(`could not add collection for contract ${tokenAddress}`))
  }
  const nft = await getNftByIndex({ collection, tokenId })
  if (isNil(nft)) {
    return Promise.reject(Error(`could not add collection for contract ${tokenAddress}`))
  }
  return nft
}

function contractOfferItemsToNfts(items: ContractOfferItems): Promise<OwnedNft[]> {
  const chain = pipe(prop('chainId'), getChain)(items)
  return pipe(
    prop('items'),
    map(pipe(assoc('chain', chain), contractOfferItemToNft)),
    promiseAll,
    andThen(filter(isOwnedNft)),
    otherwise(always([]))
  )(items)
}

export async function contractOfferToBaseOffer(contractOffer: ContractOffer): Promise<BaseOffer> {
  const { senderItems: contractSenderItems, receiverItems: contractReceiverItems, expiration } = contractOffer
  const senderItems = await contractOfferItemsToNfts(contractSenderItems)
  if (!isNonEmptyArray(senderItems)) {
    return Promise.reject(new BadRequestError({ message: 'sender items not found', severity: 'warning' }))
  }
  const receiverItems = await contractOfferItemsToNfts(contractReceiverItems)
  if (!isNonEmptyArray(receiverItems)) {
    return Promise.reject(new BadRequestError({ message: 'receiver items not found', severity: 'warning' }))
  }
  return {
    expiresAt: expiration,
    receiver: getNftsOwner(receiverItems),
    receiverItems,
    sender: getNftsOwner(senderItems),
    senderItems
  }
}
