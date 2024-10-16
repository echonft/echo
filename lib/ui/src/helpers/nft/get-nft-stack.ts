import { nftTokenCollection } from '@echo/model/helpers/token/nft-token-collection'
import type { Erc1155Item } from '@echo/model/types/item/erc1155-item'
import type { Erc721Item } from '@echo/model/types/item/erc721-item'
import type { Erc1155Token } from '@echo/model/types/token/erc1155-token'
import type { Erc721Token } from '@echo/model/types/token/erc721-token'
import type { User } from '@echo/model/types/user/user'
import type { NftStack } from '@echo/ui/types/nft-stack'
import { nonEmptyArrayMap } from '@echo/utils/fp/non-empty-array-map'
import { always, applySpec, head, type NonEmptyArray, pipe, prop } from 'ramda'

export function getNftStack(items: NonEmptyArray<Erc721Item | Erc1155Item>, owner: User): NftStack {
  const tokens = nonEmptyArrayMap(prop('token'), items)
  return pipe<[NonEmptyArray<Erc721Token | Erc1155Token>], Erc721Token | Erc1155Token, NftStack>(
    head,
    applySpec<NftStack>({
      owner: always(owner),
      collection: nftTokenCollection,
      pictureUrl: prop('pictureUrl'),
      tokenId: prop('tokenIdLabel'),
      nfts: always(tokens)
    })
  )(tokens)
}
