import type { Swap } from '@echo/model/types/swap'
import type { SwapWithRole } from '@echo/ui/types/swap-with-role'
import { assoc } from 'ramda'

export function setSwapRoleUndefined(swap: Swap): SwapWithRole {
  return assoc('role', undefined, swap)
}
