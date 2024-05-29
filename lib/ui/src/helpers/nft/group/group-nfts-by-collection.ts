import { nftComparator } from '@echo/model/helpers/nft/nft-comparator'
import type { Nft } from '@echo/model/types/nft'
import type { NftGroup } from '@echo/ui/types/nft-group'
import type { Selectable } from '@echo/ui/types/selectable'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { applySpec, collectBy, head, map, path, pipe, sort } from 'ramda'

export function groupNftsByCollection(nfts: Selectable<Nft>[]) {
  return pipe(
    collectBy(nonNullableReturn(path<string>(['collection', 'slug']))),
    map(
      applySpec<NftGroup>({
        id: pipe(head, path(['collection', 'slug'])),
        label: pipe(head, path(['collection', 'name'])),
        nfts: sort(nftComparator)
      })
    )
  )(nfts)
}
