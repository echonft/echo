import { findAccountForUser } from '@echo/firestore/crud/account/find-account-for-user'
import { addDiscordUser } from '@echo/firestore/crud/discord-user/add-discord-user'
import { findDiscordUserByUserId } from '@echo/firestore/crud/discord-user/find-discord-user-by-user-id'
import { updateDiscordUser } from '@echo/firestore/crud/discord-user/update-discord-user'
import type { AuthUser } from '@echo/ui/types/model/auth-user'
import { logger } from '@echo/utils/services/logger'
import { USER_DISCORD_INFO_VALIDITY_TIME } from '@server/constants/user-discord-info-validity-time'
import { fetchDiscordUser } from '@server/helpers/user/fetch-discord-user'
import dayjs from 'dayjs'
import { isNil } from 'ramda'

export async function updateDiscordUserIfNeeded(user: AuthUser) {
  const { id } = user
  const existingDiscordUser = await findDiscordUserByUserId(id)
  if (
    isNil(existingDiscordUser) ||
    existingDiscordUser.updatedAt.add(USER_DISCORD_INFO_VALIDITY_TIME, 'minute').isBefore(dayjs())
  ) {
    const account = await findAccountForUser(id)
    if (isNil(account)) {
      logger.error(`account does not exist for user with id ${id}`)
      return
    }
    const discordUser = await fetchDiscordUser(account.access_token, account.token_type)
    if (isNil(existingDiscordUser)) {
      await addDiscordUser(id, discordUser)
    } else {
      await updateDiscordUser(id, discordUser)
    }
  }
}
