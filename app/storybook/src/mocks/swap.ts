import { toPromise } from '@echo/utils/helpers/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { HexString } from '@echo/model/types/hex-string'
import { pipe } from 'ramda'

export function swap(): Promise<HexString> {
  return pipe(toPromise, delayPromise(800))('0xOfferExecuted')
}
