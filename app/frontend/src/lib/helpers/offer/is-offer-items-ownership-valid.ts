import { getOfferItems } from '@echo/model/helpers/offer/get-offer-items'
import type { Offer } from '@echo/model/types/offer'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { toPromise } from '@echo/utils/fp/to-promise'
import { isOwnerOfErc721 } from '@echo/web3/helpers/viem/is-owner-of-erc721'
import { all, andThen, identity, ifElse, map, pipe, prop, T } from 'ramda'

export function isOfferItemsOwnershipValid(offer: Offer): Promise<boolean> {
  return ifElse(
    prop('readOnly'),
    pipe(T, toPromise),
    pipe(getOfferItems, map(pipe(prop('nft'), isOwnerOfErc721)), promiseAll, andThen(all(identity)))
  )(offer)
}
