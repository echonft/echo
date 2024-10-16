import type { User } from '@echo/model/types/user/user'
import { stringComparator } from '@echo/utils/comparators/string-comparator'

export function userByDiscordUsernameComparator<
  T extends Partial<User> &
    Required<{
      discord: Pick<User['discord'], 'username'>
    }>
>(userA: T, userB: T): number {
  return stringComparator(userA.discord.username, userB.discord.username)
}
