import { CancelOfferError } from '@echo/frontend/lib/server/helpers/error/cancel-offer-error'
import type { Offer } from '@echo/model/types/offer'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { hasApprovedErc721 } from '@echo/web3/helpers/has-approved-erc721'
import { always, ifElse, map, otherwise, pipe, prop, propEq } from 'ramda'

export function assertOfferItemsApproval(offer: Offer) {
  return ifElse(
    propEq('ACCEPTED', 'state'),
    pipe(
      prop('receiverItems'),
      map(pipe(prop('nft'), hasApprovedErc721)),
      promiseAll,
      otherwise(() => Promise.reject(new CancelOfferError(offer)))
    ),
    always(Promise.resolve())
  )(offer)
}
