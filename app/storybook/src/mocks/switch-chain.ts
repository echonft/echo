import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'

export function switchChain(): Promise<void> {
  return delayPromise(toPromise<void>, 800)()
}
