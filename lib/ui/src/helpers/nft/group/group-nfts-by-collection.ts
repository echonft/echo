import { compareNfts } from '@echo/ui/comparators/compare-nfts'
import type { NftGroup } from '@echo/ui/types/nft-group'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { applySpec, collectBy, head, map, path, pipe, sort } from 'ramda'

export function groupNftsByCollection(nfts: SelectableNft[]) {
  return pipe(
    collectBy(nonNullableReturn(path<string>(['collection', 'id']))),
    map(
      applySpec<NftGroup>({
        id: pipe(head, path(['collection', 'id'])),
        label: pipe(head, path(['collection', 'name'])),
        nfts: sort(compareNfts)
      })
    )
  )(nfts)
}
