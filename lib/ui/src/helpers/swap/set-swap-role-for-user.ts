import type { Swap } from '@echo/model/types/swap'
import type { User } from '@echo/model/types/user'
import { setSwapRoleReceiver } from '@echo/ui/helpers/swap/set-swap-role-receiver'
import { setSwapRoleSender } from '@echo/ui/helpers/swap/set-swap-role-sender'
import { setSwapRoleUndefined } from '@echo/ui/helpers/swap/set-swap-role-undefined'
import type { SwapWithRole } from '@echo/ui/types/swap-with-role'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export function setSwapRoleForUser(user: Nullable<User>) {
  return function (swap: Swap): SwapWithRole {
    if (isNil(user)) {
      return setSwapRoleUndefined(swap)
    }
    const { username } = user
    if (swap.sender.username === username) {
      return setSwapRoleSender(swap)
    }
    if (swap.receiver.username === username) {
      return setSwapRoleReceiver(swap)
    }
    return setSwapRoleUndefined(swap)
  }
}
