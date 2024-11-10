import type { User } from '@echo/model/types/user'
import { stringComparator } from '@echo/utils/helpers/string-comparator'

export function userByDiscordUsernameComparator<T extends Record<'discord', Pick<User['discord'], 'username'>>>(
  userA: T,
  userB: T
): number {
  return stringComparator(userA.discord.username, userB.discord.username)
}
