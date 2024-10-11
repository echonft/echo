import { getNftTokenCollection } from '@echo/model/helpers/token/get-nft-token-collection'
import type { Item } from '@echo/model/types/item'
import type { NftToken } from '@echo/model/types/token'
import type { User } from '@echo/model/types/user'
import type { NftStack } from '@echo/ui/types/nft-stack'
import { nonEmptyArrayMap } from '@echo/utils/fp/non-empty-array-map'
import { always, applySpec, head, type NonEmptyArray, pipe, prop } from 'ramda'

export function getNftStack(items: NonEmptyArray<Item<NftToken>>, owner: User): NftStack {
  const tokens = nonEmptyArrayMap(prop('token'), items)
  return pipe<[NonEmptyArray<NftToken>], NftToken, NftStack>(
    head,
    applySpec<NftStack>({
      owner: always(owner),
      collection: getNftTokenCollection,
      pictureUrl: prop('pictureUrl'),
      tokenId: prop('tokenIdLabel'),
      nfts: always(tokens)
    })
  )(tokens)
}
