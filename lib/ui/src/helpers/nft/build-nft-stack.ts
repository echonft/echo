import { itemToken } from '@echo/model/helpers/item/item-token'
import { nftTokenCollection } from '@echo/model/helpers/token/nft-token-collection'
import type { NftItem } from '@echo/model/types/item'

import type { NftToken } from '@echo/model/types/token'
import type { User } from '@echo/model/types/user'
import { nftLabel } from '@echo/ui/helpers/nft/nft-label'
import type { NftStack } from '@echo/ui/types/nft-stack'
import { nonEmptyMap } from '@echo/utils/helpers/non-empty-map'
import { always, applySpec, head, type NonEmptyArray, pipe, prop } from 'ramda'

export function buildNftStack(items: NonEmptyArray<NftItem>, owner: User): NftStack {
  const tokens = nonEmptyMap(itemToken, items)
  return pipe<[NonEmptyArray<NftToken>], NftToken, NftStack>(
    head,
    applySpec<NftStack>({
      owner: always(owner),
      collection: nftTokenCollection,
      pictureUrl: prop('pictureUrl'),
      label: nftLabel,
      nfts: always(tokens)
    })
  )(tokens)
}
