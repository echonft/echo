import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { HexString } from '@echo/utils/types/hex-string'
import type { CreateOfferArgs } from '@echo/web3-dom/types/create-offer-args'

export function createOffer(_args: CreateOfferArgs): Promise<HexString> {
  return delayPromise(toPromise, 800)('0xwhatever')
}
