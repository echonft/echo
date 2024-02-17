import { OFFER_STATE_ACCEPTED } from '@echo/model/constants/offer-states'
import type { Nft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import type { OfferItem } from '@echo/model/types/offer-item'
import type { OfferState } from '@echo/model/types/offer-state'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { toPromise } from '@echo/utils/fp/to-promise'
import { hasApprovedErc721 } from '@echo/web3/helpers/viem/has-approved-erc721'
import { all, andThen, eqBy, identity, ifElse, map, path, pipe, prop, propEq, T, uniqWith } from 'ramda'

export function isOfferItemsApprovalValid(offer: Offer): Promise<boolean> {
  return ifElse<[Offer], Promise<boolean>, Promise<boolean>>(
    propEq<OfferState, 'state'>(OFFER_STATE_ACCEPTED, 'state'),
    pipe(
      prop('receiverItems'),
      map<OfferItem, Nft>(prop('nft')),
      uniqWith(eqBy(path(['collection', 'contract']))),
      map(hasApprovedErc721),
      promiseAll,
      andThen(all(identity))
    ),
    pipe(T, toPromise)
  )(offer)
}
