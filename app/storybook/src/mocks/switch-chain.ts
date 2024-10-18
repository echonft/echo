import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { Chain } from '@echo/utils/constants/chain'

export function switchChain(_chain?: Chain): Promise<void> {
  return delayPromise(toPromise<void>, 800)()
}
