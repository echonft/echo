import { nftAttributeEquals } from '@echo/ui/comparators/nft-attribute-equals'
import type { Nft } from '@echo/ui/types/model/nft'
import { TraitFilter } from '@echo/ui/types/trait-filter'
import { applySpec, collectBy, eqProps, flatten, groupWith, head, length, map, pipe, prop, sort } from 'ramda'

export function getTraitFiltersForNfts(nfts: Nft[]): TraitFilter[] {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
    map(prop('attributes')),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    flatten,
    sort(nftAttributeEquals),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    collectBy(prop('trait')),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    map(
      pipe(
        groupWith(eqProps('value')),
        map(
          applySpec({
            trait: pipe(head, prop('trait')),
            value: pipe(head, prop('value')),
            count: length
          })
        )
      )
    ),
    flatten
  )(nfts)
}
