import { erc1155NftToToken } from '@echo/model/mappers/nft/erc1155-nft-to-token'
import type { Erc1155Item } from '@echo/model/types/item'
import type { Erc1155Nft } from '@echo/model/types/nft'

export function erc1155NftToItem(quantity: number): (nft: Erc1155Nft) => Erc1155Item {
  return function (nft: Erc1155Nft): Erc1155Item {
    return {
      token: erc1155NftToToken(nft),
      quantity
    }
  }
}
