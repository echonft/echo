import type { User } from '@echo/model/types/user'
import { propIsNotNil } from '@echo/utils/helpers/prop-is-not-nil'

export function userHasWallet(user: User): user is User & Required<Pick<User, 'wallet'>> {
  return propIsNotNil('wallet', user)
}
