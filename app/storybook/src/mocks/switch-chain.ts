import { delayPromise } from '@echo/utils/helpers/delay-promise'

export function switchChain() {
  return delayPromise(Promise.resolve(), 800)
}
