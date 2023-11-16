import type { Group } from '@echo/ui/types/group'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { applySpec, groupBy, head, identity, map, path, pipe, values } from 'ramda'

export function groupNftsByCollection(nfts: SelectableNft[]) {
  return pipe(
    groupBy(nonNullableReturn(path<string>(['collection', 'id']))),
    values,
    map(
      applySpec<Group<SelectableNft>>({
        id: pipe(head, path(['collection', 'id'])),
        name: pipe(head, path(['collection', 'name'])),
        items: identity
      })
    )
  )(nfts)
}
