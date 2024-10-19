import { BadRequestError } from '@echo/backend/errors/bad-request-error'
import { NotFoundError } from '@echo/backend/errors/not-found-error'
import type { Erc721ItemWithOwner } from '@echo/backend/types/erc721-item-with-owner'
import { getCollectionByAddress } from '@echo/firestore/crud/collection/get-collection-by-address'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { CollectionError } from '@echo/model/constants/errors/collection-error'
import { NftError } from '@echo/model/constants/errors/nft-error'
import { isOwnedNft } from '@echo/model/helpers/nft/is-owned-nft'
import { erc721NftToItem } from '@echo/model/mappers/nft/erc721-nft-to-item'
import type { Erc721Nft } from '@echo/model/types/nft/erc721-nft'
import type { Chain } from '@echo/utils/constants/chain'
import type { ContractOfferItem } from '@echo/web3/types/contract-offer-item'
import { assoc, isNil, pipe } from 'ramda'

// TODO add ERC20 and ERC1155
export async function contractOfferItemToErc721Item(
  item: ContractOfferItem & Record<'chain', Chain>
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
  return pipe(erc721NftToItem, assoc('owner', nft.owner))(nft as Erc721Nft)
}
