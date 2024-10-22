import { itemToken } from '@echo/model/helpers/item/item-token'
import { nftTokenCollection } from '@echo/model/helpers/token/nft-token-collection'
import type { NftItem } from '@echo/model/types/item/nft-item'
import type { NftToken } from '@echo/model/types/token/nft-token'
import type { User } from '@echo/model/types/user/user'
import type { NftStack } from '@echo/ui/types/nft-stack'
import { nonEmptyMap } from '@echo/utils/fp/non-empty-map'
import { always, applySpec, head, type NonEmptyArray, pipe, prop } from 'ramda'

export function getNftStack(items: NonEmptyArray<NftItem>, owner: User): NftStack {
  const tokens = nonEmptyMap(itemToken, items)
  return pipe<[NonEmptyArray<NftToken>], NftToken, NftStack>(
    head,
    applySpec<NftStack>({
      owner: always(owner),
      collection: nftTokenCollection,
      pictureUrl: prop('pictureUrl'),
      tokenIdLabel: prop('tokenIdLabel'),
      nfts: always(tokens)
    })
  )(tokens)
}
