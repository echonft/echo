import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { pipe } from 'ramda'

export function switchChain(): Promise<void> {
  return pipe(toPromise<void>, delayPromise(800))()
}
