import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ExecuteSwapArgs } from '@echo/web3-dom/types/execute-swap-args'

export function executeSwap(_args: ExecuteSwapArgs): Promise<HexString> {
  return delayPromise(Promise.resolve('0xwhatever'), 800)
}
