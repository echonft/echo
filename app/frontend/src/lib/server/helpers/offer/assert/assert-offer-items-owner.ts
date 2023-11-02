import { CancelOfferError } from '@echo/frontend/lib/server/helpers/error/cancel-offer-error'
import { getOfferItems } from '@echo/model/helpers/offer/get-offer-items'
import { offerIsFinal } from '@echo/model/helpers/offer/offer-is-final'
import type { Offer } from '@echo/model/types/offer'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { isOwnerOfErc721 } from '@echo/web3/helpers/is-owner-of-erc721'
import { always, ifElse, map, otherwise, pipe, prop } from 'ramda'

export function assertOfferItemsOwner(offer: Offer) {
  return ifElse(
    offerIsFinal,
    always(Promise.resolve()),
    pipe(
      getOfferItems,
      map(pipe(prop('nft'), isOwnerOfErc721)),
      promiseAll,
      otherwise(() => Promise.reject(new CancelOfferError(offer)))
    )
  )(offer)
}
