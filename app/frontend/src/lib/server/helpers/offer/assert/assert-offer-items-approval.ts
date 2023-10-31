import { CancelOfferError } from '@echo/frontend/lib/server/helpers/error/cancel-offer-error'
import type { Nft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import type { OfferItem } from '@echo/model/types/offer-item'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { hasApprovedErc721 } from '@echo/web3/helpers/has-approved-erc721'
import { always, eqBy, ifElse, map, otherwise, path, pipe, prop, propEq, uniqWith } from 'ramda'

export function assertOfferItemsApproval(offer: Offer) {
  return ifElse(
    propEq('ACCEPTED', 'state'),
    pipe(
      prop('receiverItems'),
      map<OfferItem, Nft>(prop('nft')),
      uniqWith(eqBy(path(['collection', 'contract']))),
      map(hasApprovedErc721),
      promiseAll,
      otherwise(() => Promise.reject(new CancelOfferError(offer)))
    ),
    always(Promise.resolve())
  )(offer)
}
