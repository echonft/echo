import type { Offer } from '@echo/model/types/offer'
import { Background } from '@echo/ui/constants/background'
import { getBackgroundGradientFromColor } from '@echo/ui/helpers/get-background-gradient-from-color'
import { getOfferBackgroundColor } from '@echo/ui/helpers/offer/get-offer-background-color'
import type { Nullable } from '@echo/utils/types/nullable'
import { always, ifElse, isNil, pipe, prop } from 'ramda'

export function getOfferBackground(offer: Nullable<Offer>) {
  return ifElse<Nullable<Offer>, undefined | null, Background, Background>(
    isNil,
    always(Background.Default),
    pipe(prop('state'), getOfferBackgroundColor, getBackgroundGradientFromColor)
  )(offer)
}
