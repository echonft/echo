import type { Nft } from '@echo/model/types/nft'
import type { NftGroup } from '@echo/ui/types/nft-group'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { applySpec, groupBy, head, identity, map, path, pipe, values } from 'ramda'

export function groupNftsByOwner(nfts: Nft[]): NftGroup[] {
  return pipe(
    groupBy(nonNullableReturn(path<string>(['owner', 'discord', 'username']))),
    values,
    map(
      applySpec<NftGroup>({
        id: pipe(head, path(['owner', 'discord', 'username'])),
        nfts: identity
      })
    )
  )(nfts)
}
