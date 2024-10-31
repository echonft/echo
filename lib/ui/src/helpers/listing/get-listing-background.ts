import type { Listing } from '@echo/model/types/listing'
import { Background } from '@echo/ui/constants/background'
import { getBackgroundGradientFromColor } from '@echo/ui/helpers/get-background-gradient-from-color'
import { getListingBackgroundColor } from '@echo/ui/helpers/listing/get-listing-background-color'
import type { Nullable } from '@echo/utils/types/nullable'
import { always, ifElse, isNil, pipe, prop } from 'ramda'

export function getListingBackground(listing: Nullable<Listing>) {
  return ifElse<Nullable<Listing>, Nullable, Background, Background>(
    isNil,
    always(Background.Default),
    pipe(prop('state'), getListingBackgroundColor, getBackgroundGradientFromColor)
  )(listing)
}
