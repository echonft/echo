import type { Nft } from '@echo/model/types/nft'
import { DisableableType } from '@echo/ui/types/disableable'
import type { Group } from '@echo/ui/types/group'
import { SelectableType } from '@echo/ui/types/selectable'
import { eqPaths } from '@echo/utils/fp/eq-paths'
import { applySpec, groupWith, head, identity, map, path, pipe } from 'ramda'

export function groupNftsByCollection(nfts: Nft[]): Group<DisableableType<SelectableType<Nft>>>[] {
  return pipe(
    groupWith(eqPaths(['collection', 'id'])),
    map(
      applySpec<Group<DisableableType<SelectableType<Nft>>>>({
        id: pipe(head, path(['collection', 'id'])),
        name: pipe(head, path(['collection', 'name'])),
        items: identity
      })
    )
  )(nfts)
}
