import { createNewUser } from './create-new-user'
import { fetchDiscordUserGuilds } from '@echo/discord/dist/utils/fetch-discord-user-guilds'
import { findUserByDiscordId } from '@echo/firebase-admin'
import { updateUserGuilds } from '@echo/firebase-admin/dist/crud/user/update-user-guilds'
import { isNilOrEmpty } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { prop } from 'ramda'

export function createOrUpdateUser(
  accessToken: string | undefined,
  tokenType: string | undefined,
  discordId: string | undefined
) {
  if (isNilOrEmpty(accessToken) || isNilOrEmpty(tokenType)) {
    throw Error('Auth error: missing access token')
  }
  if (isNilOrEmpty(discordId)) {
    throw Error('Auth error: missing Discord Id')
  }

  return findUserByDiscordId(discordId).then((userResult) => {
    // User is not found, we create it
    if (R.isError(userResult)) {
      return createNewUser(accessToken, tokenType)
    }
    return fetchDiscordUserGuilds(accessToken, tokenType).then((result) => {
      if (R.isOk(result)) {
        return updateUserGuilds(R.getExn(userResult).id, R.getExn(result).map(prop('id')))
      }
      return userResult
    })
  })
}
