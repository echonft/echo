import { Contract } from '@echo/ui/types/model/contract'
import { Offer } from '@echo/ui/types/model/offer'
import { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { map, path, pipe, prop, uniq } from 'ramda'

export function getOfferReceiverItemsUniqueContracts(offer: Offer): NonEmptyArray<Contract> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(prop('receiverItems'), map(path(['nft', 'collection', 'contract'])), uniq<Contract>)(offer)
}
