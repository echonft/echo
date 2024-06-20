import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { GetEchoTradingFeesArgs } from '@echo/web3-dom/helpers/get-echo-trading-fees'

export async function getEchoTradingFees(_args: GetEchoTradingFeesArgs): Promise<bigint> {
  return delayPromise(() => Promise.resolve<bigint>(BigInt(0)), 800)()
}
