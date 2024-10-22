import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { GetEchoTradingFeesArgs } from '@echo/web3-dom/helpers/get-echo-trading-fees'
import { pipe } from 'ramda'

export async function getEchoTradingFees(_args: GetEchoTradingFeesArgs): Promise<bigint> {
  return pipe(toPromise, delayPromise(800))(BigInt(0))
}
