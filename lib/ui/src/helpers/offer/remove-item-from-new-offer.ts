import type { NewOffer } from '@echo/ui/types/model/new-offer'
import { always, identity, ifElse, modify, pathEq, pipe, reject } from 'ramda'

export function removeItemFromNewOffer(itemNftId: string, isReceiver: boolean) {
  return function (newOffer: NewOffer): NewOffer {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return pipe(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modify('receiverItems', ifElse(always(isReceiver), reject(pathEq(itemNftId, ['nft', 'id'])), identity)),
      modify('senderItems', ifElse(always(isReceiver), identity, reject(pathEq(itemNftId, ['nft', 'id']))))
    )(newOffer)
  }
}
