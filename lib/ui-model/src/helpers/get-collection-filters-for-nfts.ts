import { compareNftCollections } from '../comparators/compare-nft-collections'
import { CollectionFilter } from '../types/collection-filter'
import { Nft } from '../types/nft'
import { applySpec, equals, groupWith, head, length, map, pipe, prop, sort } from 'ramda'

export function getCollectionFiltersForNfts(nfts: Nft[]): CollectionFilter[] {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    map(prop('collection')),
    sort(compareNftCollections),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    groupWith(equals),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    map(
      applySpec({
        id: pipe(head, prop('id')),
        name: pipe(head, prop('name')),
        count: length
      })
    )
  )(nfts)
}
