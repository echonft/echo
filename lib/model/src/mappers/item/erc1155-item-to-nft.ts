import { nftItemToNft } from '@echo/model/mappers/item/nft-item-to-nft'
import type { Erc1155Item } from '@echo/model/types/item/erc1155-item'
import type { OwnedErc1155Nft } from '@echo/model/types/nft/owned-erc1155-nft'
import type { User } from '@echo/model/types/user/user'

export function erc1155ItemToNft(owner: User): (item: Erc1155Item) => Omit<OwnedErc1155Nft, 'attributes'> {
  return function (item: Erc1155Item): Omit<OwnedErc1155Nft, 'attributes'> {
    return nftItemToNft<Erc1155Item>(owner)(item)
  }
}
