import type { SwapDocument } from '@echo/firestore/types/model/swap-document'
import { toSwapWithRole } from '@echo/frontend/lib/helpers/swap/to-swap-with-role'
import type { User } from '@echo/model/types/user'
import type { Nullable } from '@echo/utils/types/nullable'
import { map } from 'ramda'

export function toSwapsWithRole(user: Nullable<User>) {
  return function (swaps: SwapDocument[]) {
    return map(toSwapWithRole(user))(swaps)
  }
}
