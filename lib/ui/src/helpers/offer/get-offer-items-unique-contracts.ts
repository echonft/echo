import { Contract } from '@echo/ui/types/model/contract'
import { OfferItem } from '@echo/ui/types/model/offer-item'
import { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { map, path, pipe, uniq } from 'ramda'

export function getOfferItemsUniqueContracts(offerItems: NonEmptyArray<OfferItem>): NonEmptyArray<Contract> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(map(path(['nft', 'collection', 'contract'])), uniq<Contract>)(offerItems)
}
