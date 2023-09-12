import { Group } from '../../types/group'
import { Nft } from '@echo/ui-model'
import eqPaths from '@echo/utils/eq-paths'
import { applySpec, groupWith, head, identity, isEmpty, map, path, pipe, unless } from 'ramda'

export function groupNftsByCollection(nfts: Array<Nft>): Array<Group<Nft>> {
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
  )(nfts) as Array<Group<Nft>>
}
