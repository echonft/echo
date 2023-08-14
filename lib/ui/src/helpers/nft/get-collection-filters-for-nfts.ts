import { compareNftCollections } from '../../comparators/nft-collection/compare-nft-collections'
import { CollectionFilter } from '../../types/model/collection-filter'
import { Nft } from '../../types/nft'
import { applySpec, equals, groupWith, head, length, map, pipe, prop, sort } from 'ramda'

export const getCollectionFiltersForNfts = pipe(
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
) as (nfts: Nft[]) => CollectionFilter[]
