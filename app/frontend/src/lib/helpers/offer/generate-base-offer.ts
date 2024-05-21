import { OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import type { BaseOffer } from '@echo/model/types/base-offer'
import type { OfferItem } from '@echo/model/types/offer-item'
import { always, applySpec, head, path, pipe, prop } from 'ramda'

export function generateBaseOffer(args: {
  senderOfferItems: OfferItem[]
  receiverOfferItems: OfferItem[]
  expiresAt: number
}): BaseOffer {
  return applySpec<BaseOffer>({
    expiresAt: prop('expiresAt'),
    receiver: pipe(prop('receiverOfferItems'), head, path(['nft', 'owner'])),
    receiverItems: prop('receiverOfferItems'),
    sender: pipe(prop('senderOfferItems'), head, path(['nft', 'owner'])),
    senderItems: prop('senderOfferItems'),
    state: always(OFFER_STATE_OPEN)
  })(args)
}
