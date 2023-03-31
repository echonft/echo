import { mapDiscordUserResponseToUserPrototype } from '../../mappers/map-discord-user-response-to-user-prototype'
import { fetchDiscordUser } from '@echo/discord'
import { addUser, findUserByDiscordId } from '@echo/firebase-admin'
import { updateUserDiscordInfo } from '@echo/firebase-admin/dist/crud/user/update-user-discord-info'
import { isNilOrEmpty } from '@echo/utils'
import { R } from '@mobily/ts-belt'

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
  return Promise.all([findUserByDiscordId(discordId), fetchDiscordUser(accessToken, tokenType, true)]).then(
    ([userResult, discordUserResponse]) => {
      if (R.isError(discordUserResponse)) {
        throw Error('Auth error: error fetching discord user')
      }
      const userPrototype = mapDiscordUserResponseToUserPrototype(R.getExn(discordUserResponse))
      // User is not found, we create it
      if (R.isError(userResult)) {
        return addUser(userPrototype)
      }
      // Else update user discord info
      return updateUserDiscordInfo(R.getExn(userResult).id, userPrototype)
    }
  )
}
