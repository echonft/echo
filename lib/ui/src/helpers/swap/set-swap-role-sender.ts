import { OfferRole } from '@echo/model/constants/offer-role'
import type { Swap } from '@echo/model/types/swap'
import type { SwapWithRole } from '@echo/ui/types/swap-with-role'
import { assoc } from 'ramda'

export function setSwapRoleSender(swap: Swap): SwapWithRole {
  return assoc<OfferRole, Swap, 'role'>('role', OfferRole.Sender, swap)
}
