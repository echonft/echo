import { nftItemToNft } from '@echo/model/mappers/item/nft-item-to-nft'
import type { Erc721Item } from '@echo/model/types/erc721-item'
import type { OwnedErc721Nft } from '@echo/model/types/owned-erc721-nft'
import type { User } from '@echo/model/types/user'

export function erc721ItemToNft(owner: User): (item: Erc721Item) => Omit<OwnedErc721Nft, 'attributes'> {
  return function (item: Erc721Item): Omit<OwnedErc721Nft, 'attributes'> {
    return nftItemToNft<Erc721Item>(owner)(item)
  }
}
