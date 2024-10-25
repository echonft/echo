import type { Swap } from '@echo/model/types/swap'

export function swapSender(swap: Swap) {
  return swap.sender
}
