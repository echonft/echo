import { getOfferItems } from '@echo/model/helpers/offer/get-offer-items'
import { offerIsFinalOrExpired } from '@echo/model/helpers/offer/offer-is-final-or-expired'
import type { Offer } from '@echo/model/types/offer'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { toPromise } from '@echo/utils/fp/to-promise'
import { isOwnerOfErc721 } from '@echo/web3/helpers/viem/is-owner-of-erc721'
import { F, ifElse, map, otherwise, pipe, prop, T } from 'ramda'

export function assertOfferItemsOwner(offer: Offer) {
  return ifElse(
    offerIsFinalOrExpired,
    pipe(T, toPromise),
    pipe(getOfferItems, map(pipe(prop('nft'), isOwnerOfErc721)), promiseAll, otherwise(F))
  )(offer)
}
