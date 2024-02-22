import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { HexString } from '@echo/utils/types/hex-string'
import type { SignOfferArgs } from '@echo/web3-dom/types/sign-offer-args'

export function signOffer(_args: SignOfferArgs): Promise<HexString> {
  return delayPromise(toPromise, 800)('0xwhatever')
}
