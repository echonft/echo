import { compareNftAttributes } from '../../comparator/nft/compare-nft-attributes'
import { Nft } from '../../types/nft'
import { NftAttribute } from '../../types/nft-attribute'
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
  reduce,
  sort
} from 'ramda'

export const getTraitsForNfts = pipe<
  [Nft[]],
  NftAttribute[][],
  NftAttribute[],
  NftAttribute[],
  Partial<Record<string, NftAttribute[]>>,
  NftTraits
>(
  reduce((acc: NftAttribute[][], value: Nft) => {
    acc.push(value.attributes)
    return acc
  }, []),
  flatten,
  sort(compareNftAttributes),
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
