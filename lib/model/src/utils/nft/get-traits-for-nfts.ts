import { compareNftAttributes } from '../../comparators/nft/compare-nft-attributes'
import { Nft } from '../../types/nft'
import { NftTraits } from '../../types/nft-traits'
import {
  applySpec,
  equals,
  flatten,
  groupBy,
  groupWith,
  head,
  length,
  map,
  mapObjIndexed,
  pipe,
  prop,
  sort
} from 'ramda'

export const getTraitsForNfts = pipe(
  map(prop('attributes')),
  flatten,
  sort(compareNftAttributes),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  groupBy(prop('trait')),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  mapObjIndexed(
    pipe(
      map(prop('value')),
      groupWith(equals),
      map(
        applySpec({
          value: head,
          count: length
        })
      )
    )
  )
) as (nfts: Nft[]) => NftTraits
