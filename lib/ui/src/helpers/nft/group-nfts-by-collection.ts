import type { Group } from '@echo/ui/types/group'
import type { Nft } from '@echo/ui/types/model/nft'
import { eqPaths } from '@echo/utils/fp/eq-paths'
import { applySpec, groupWith, head, identity, isEmpty, map, path, pipe, unless } from 'ramda'

export function groupNftsByCollection(nfts: Nft[]): Group<Nft>[] {
  return unless(
    isEmpty,
    pipe(
      groupWith(eqPaths(['collection', 'id'])),
      map(
        applySpec<Group<Nft>>({
          id: pipe(head, path(['collection', 'id'])),
          name: pipe(head, path(['collection', 'name'])),
          items: identity
        })
      )
    )
  )(nfts) as Group<Nft>[]
}
