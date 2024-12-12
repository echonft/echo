import { rangeDelay } from 'delay'

export function switchChain(): Promise<void> {
  return rangeDelay(800, 1600)
}
