import { itemToken } from '@echo/model/helpers/item/item-token'
import { nftTokenToNft } from '@echo/model/mappers/token/nft-token-to-nft'
import type { Erc721Item } from '@echo/model/types/item/erc721-item'
import type { NftItem } from '@echo/model/types/item/nft-item'
import type { OwnedErc1155Nft } from '@echo/model/types/nft/owned-erc1155-nft'
import type { OwnedErc721Nft } from '@echo/model/types/nft/owned-erc721-nft'
import type { User } from '@echo/model/types/user/user'
import { pipe } from 'ramda'

export function nftItemToNft<T extends NftItem>(
  owner: User
): (item: T) => T extends Erc721Item ? Omit<OwnedErc721Nft, 'attributes'> : Omit<OwnedErc1155Nft, 'attributes'> {
  return function <T extends NftItem>(
    item: T
  ): T extends Erc721Item ? Omit<OwnedErc721Nft, 'attributes'> : Omit<OwnedErc1155Nft, 'attributes'> {
    return pipe(itemToken<T>, nftTokenToNft<T['token']>(owner))(item) as T extends Erc721Item
      ? Omit<OwnedErc721Nft, 'attributes'>
      : Omit<OwnedErc1155Nft, 'attributes'>
  }
}
