import type { Nft } from '@echo/model/types/nft'
import { compareNfts } from '@echo/ui/comparators/compare-nfts'
import type { NftGroup } from '@echo/ui/types/nft-group'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { applySpec, collectBy, head, map, path, pipe, sort } from 'ramda'

export function groupNftsByOwner(nfts: Nft[]): NftGroup[] {
  return pipe(
    collectBy(nonNullableReturn(path<string>(['owner', 'discord', 'username']))),
    map(
      applySpec<NftGroup>({
        id: pipe(head, path(['owner', 'discord', 'username'])),
        nfts: sort(compareNfts)
      })
    )
  )(nfts)
}
