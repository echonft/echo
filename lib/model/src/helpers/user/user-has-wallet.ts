import type { User } from '@echo/model/types/user'
import { propIsNotNil } from '@echo/utils/helpers/prop-is-not-nil'

export function userHasWallet<T extends Pick<User, 'wallet'>>(user: T): user is T & Required<Pick<User, 'wallet'>> {
  return propIsNotNil('wallet', user)
}
