import { compareNftAttributes } from '@echo/ui/comparators/compare-nft-attributes'
import type { Nft } from '@echo/ui/types/model/nft'
import type { NftTraits } from '@echo/ui/types/model/nft-traits'
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

export function getTraitsForNfts(nfts: Nft[]): NftTraits {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
    map(prop('attributes')),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
  )(nfts)
}
