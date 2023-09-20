import { findAccountForUser } from '@echo/firestore/crud/account/find-account-for-user'
import { addDiscordUser } from '@echo/firestore/crud/discord-user/add-discord-user'
import { findDiscordUserByUserId } from '@echo/firestore/crud/discord-user/find-discord-user-by-user-id'
import { updateDiscordUser } from '@echo/firestore/crud/discord-user/update-discord-user'
import { logger } from '@echo/utils/services/logger'
import { USER_DISCORD_INFO_VALIDITY_TIME } from '@server/constants/user-discord-info-validity-time'
import { fetchDiscordUser } from '@server/helpers/user/fetch-discord-user'
import dayjs from 'dayjs'
import { isNil } from 'ramda'

export async function updateDiscordUserIfNeeded(userId: string) {
  const existingDiscordUser = await findDiscordUserByUserId(userId)
  if (
    isNil(existingDiscordUser) ||
    existingDiscordUser.updatedAt.add(USER_DISCORD_INFO_VALIDITY_TIME, 'minute').isBefore(dayjs())
  ) {
    const account = await findAccountForUser(userId)
    if (isNil(account)) {
      logger.error(`account does not exist for user with id ${userId}`)
      return
    }
    const discordUser = await fetchDiscordUser(account.access_token, account.token_type)
    if (isNil(existingDiscordUser)) {
      await addDiscordUser(userId, discordUser)
    } else {
      await updateDiscordUser(userId, discordUser)
    }
  }
}
