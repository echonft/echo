import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { ChainName } from '@echo/utils/types/chain-name'

export function switchChain(_chain?: ChainName): Promise<void> {
  return delayPromise(toPromise<void>, 800)()
}
