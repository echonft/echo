import { Group } from '../../types/group'
import { Nft } from '@echo/ui-model'
import { NonEmptyArray } from '@echo/utils'
import { eqPaths } from '@echo/utils/src/fp/eq-paths'
import { applySpec, groupWith, head, identity, map, path, pipe } from 'ramda'

export function groupNftsByCollection(nfts: NonEmptyArray<Nft>): Array<Group<Nft>> {
  return pipe(
    groupWith(eqPaths(['collection', 'id'])),
    map(
      applySpec<Group<Nft>>({
        id: pipe(head, path(['collection', 'id'])),
        name: pipe(head, path(['collection', 'name'])),
        items: identity
      })
    )
  )(nfts)
}
