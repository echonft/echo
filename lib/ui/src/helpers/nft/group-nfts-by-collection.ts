import { type Group } from '@echo/ui/types/group'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { eqPaths } from '@echo/utils/fp/eq-paths'
import { applySpec, groupWith, head, identity, map, path, pipe } from 'ramda'

export function groupNftsByCollection(nfts: SelectableNft[]) {
  return pipe(
    groupWith(eqPaths(['collection', 'id'])),
    map(
      applySpec<Group<SelectableNft>>({
        id: pipe(head, path(['collection', 'id'])),
        name: pipe(head, path(['collection', 'name'])),
        items: identity
      })
    )
  )(nfts)
}
