import { compareNftByCollection } from '../comparators/compare-nft-by-collections'
import { CollectionFilter } from '../types/collection-filter'
import { Nft } from '../types/nft'
import { applySpec, eqProps, groupWith, head, length, map, pick, pipe, prop, sort } from 'ramda'

export function getCollectionFiltersForNfts(nfts: Nft[]): CollectionFilter[] {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
    sort(compareNftByCollection),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    map(pick(['collectionId', 'collectionName'])),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    groupWith(eqProps('collectionId')),
    map(
      applySpec({
        id: pipe(head, prop('collectionId')),
        name: pipe(head, prop('collectionName')),
        count: length
      })
    )
  )(nfts)
}
