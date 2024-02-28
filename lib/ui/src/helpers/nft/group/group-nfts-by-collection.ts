import type { NftGroup } from '@echo/ui/types/nft-group'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { applySpec, groupBy, head, identity, map, path, pipe, values } from 'ramda'

export function groupNftsByCollection(nfts: SelectableNft[]) {
  return pipe(
    groupBy(nonNullableReturn(path<string>(['collection', 'id']))),
    values,
    map(
      applySpec<NftGroup>({
        id: pipe(head, path(['collection', 'id'])),
        label: pipe(head, path(['collection', 'name'])),
        nfts: identity
      })
    )
  )(nfts)
}
