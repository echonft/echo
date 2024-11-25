import type { Offer } from '@echo/model/types/offer'
import { Background } from '@echo/ui/constants/background'
import { getBackgroundGradientFromColor } from '@echo/ui/helpers/get-background-gradient-from-color'
import { getOfferBackgroundColor } from '@echo/ui/helpers/offer/get-offer-background-color'
import type { Nullable } from '@echo/utils/types/nullable'
import { always, ifElse, isNotNil, pipe, prop } from 'ramda'

export function getOfferBackground(offer: Nullable<Offer>) {
  return ifElse<Nullable<Offer>, NonNullable<Offer>, Background, Background>(
    isNotNil,
    pipe(prop('state'), getOfferBackgroundColor, getBackgroundGradientFromColor),
    always(Background.Default)
  )(offer)
}
