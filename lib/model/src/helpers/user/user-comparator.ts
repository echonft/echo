import type { User } from '@echo/model/types/user'
import { stringComparator } from '@echo/utils/comparators/string-comparator'

export function userComparator<T extends Partial<User> & Required<Pick<User, 'username'>>>(userA: T, userB: T): number {
  return stringComparator(userA.username, userB.username)
}
