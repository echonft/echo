import { nftAttributeComparator } from '@echo/model/helpers/nft/nft-attribute-comparator'
import { type Nft } from '@echo/model/types/nft'
import { type NftAttribute } from '@echo/model/types/nft-attribute'
import type { TraitFilter } from '@echo/ui/types/trait-filter'
import type { TraitFilterGroup } from '@echo/ui/types/trait-filter-group'
import { collectBy, flatten, head, length, map, pipe, prop, sort } from 'ramda'

export function getTraitFiltersForNfts<T extends Nft>(nfts: T[]): TraitFilterGroup[] {
  return pipe(
    map<T, NftAttribute[]>(prop('attributes')),
    flatten,
    sort(nftAttributeComparator),
    collectBy(prop('trait')),
    map(
      pipe(
        collectBy(prop('value')),
        map<NftAttribute[], TraitFilter>((attributes: NftAttribute[]): TraitFilter => {
          const attribute = head(attributes)!
          return {
            attribute,
            id: `${attribute.trait}-${attribute.value}`,
            label: attribute.value,
            count: length(attributes)
          }
        })
      )
    ),
    map<TraitFilter[], TraitFilterGroup>((filters: TraitFilter[]): TraitFilterGroup => {
      const filter = head(filters)!
      return {
        id: filter.attribute.trait,
        label: filter.attribute.trait,
        filters
      }
    })
  )(nfts)
}
