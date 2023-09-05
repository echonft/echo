import { compareNftByCollection } from '../comparators/compare-nft-by-collections'
import { CollectionFilter } from '../types/collection-filter'
import { Nft } from '../types/nft'
import { applySpec, eqProps, groupWith, head, length, map, pipe, prop, sort } from 'ramda'

export function getCollectionFiltersForNfts(nfts: Nft[]): CollectionFilter[] {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
    sort(compareNftByCollection),
    map(prop('collection')),
    groupWith(eqProps('id')),
    map(
      applySpec({
        id: pipe(head, prop('id')),
        name: pipe(head, prop('name')),
        count: length
      })
    )
  )(nfts)
}
