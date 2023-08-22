import { ListingTarget } from '../../types/model/listing-target'
import { NonEmptyArray } from '@echo/utils'
import { map, path, pipe, uniq } from 'ramda'

export const getListingTargetsCollectionIds = (targets: NonEmptyArray<ListingTarget>): string[] =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  pipe(map(path(['collection', 'id'])), uniq)(targets)
