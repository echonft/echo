import { type Nft } from '@echo/model/types/nft'
import { type NftAttribute } from '@echo/model/types/nft-attribute'
import { nftAttributeEquals } from '@echo/ui/comparators/nft-attribute-equals'
import { type TraitFilter } from '@echo/ui/types/trait-filter'
import { applySpec, collectBy, eqProps, flatten, groupWith, head, length, map, pipe, prop, sort } from 'ramda'

export function getTraitFiltersForNfts(nfts: Nft[]): TraitFilter[] {
  return pipe(
    map<Nft, NftAttribute[]>(prop('attributes')),
    flatten,
    sort(nftAttributeEquals),
    collectBy(prop('trait')),
    map(
      pipe(
        groupWith(eqProps('value')),
        map(
          applySpec<TraitFilter>({
            trait: pipe(head<NftAttribute, NftAttribute>, prop('trait')),
            value: pipe(head<NftAttribute, NftAttribute>, prop('value')),
            count: length
          })
        )
      )
    ),
    flatten
  )(nfts)
}
