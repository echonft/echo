import type { UserIndex } from '@echo/model/types/user/user'
import { pick } from 'ramda'

export function userIndex(user: UserIndex): UserIndex {
  return pick(['username', 'wallet'], user)
}
