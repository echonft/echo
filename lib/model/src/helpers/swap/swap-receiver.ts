import type { Swap } from '@echo/model/types/swap'

export function swapReceiver(swap: Swap) {
  return swap.receiver
}
