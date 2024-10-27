import { toPromise } from '@echo/utils/helpers/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { HexString } from '@echo/utils/types/hex-string'
import { pipe } from 'ramda'

export function acceptOffer(): Promise<HexString> {
  return pipe(toPromise, delayPromise(800))('0xOfferAccepted')
}
