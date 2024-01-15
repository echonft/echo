import type { AuthUser } from '@echo/model/types/auth-user'
import type { Wallet } from '@echo/model/types/wallet'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { includes, map, modify, toLower } from 'ramda'

export function userHasWallet(user: AuthUser, wallet: Wallet): boolean {
  if (isNilOrEmpty(user.wallets)) {
    return false
  }
  return includes(modify('address', toLower, wallet), map(modify('address', toLower), user.wallets))
}
