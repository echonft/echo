import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { pipe } from 'ramda'

export async function getEchoTradingFees(): Promise<bigint> {
  return pipe(toPromise, delayPromise(800))(BigInt(0))
}
