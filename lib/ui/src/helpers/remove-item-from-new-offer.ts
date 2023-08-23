import { NewOffer, OfferItem } from '@echo/ui-model'
import { always, identity, ifElse, modify, pipe, propEq, reject } from 'ramda'

export function removeItemFromNewOffer(itemToRemove: OfferItem, isReceiver: boolean) {
  return function (newOffer: NewOffer): NewOffer {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return pipe(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modify('receiverItems', ifElse(always(isReceiver), reject(propEq(itemToRemove.id, 'id')), identity)),
      modify('senderItems', ifElse(always(isReceiver), identity, reject(propEq(itemToRemove.id, 'id'))))
    )(newOffer)
  }
}
