import { mapDiscordUserResponseToUserPrototype } from '../../mappers/map-discord-user-response-to-user-prototype'
import { updateUserNfts } from '../handler/update-user-nfts'
import { fetchDiscordUser } from '@echo/discord'
import { addUser, findUserByDiscordId, updateUserDiscordInfo } from '@echo/firebase-admin'
import { isNilOrEmpty } from '@echo/utils'

export function createOrUpdateUser(
  accessToken: string | undefined,
  tokenType: string | undefined,
  discordId: string | undefined
) {
  if (isNilOrEmpty(accessToken) || isNilOrEmpty(tokenType)) {
    return Promise.reject('Auth error: missing access token')
  }
  if (isNilOrEmpty(discordId)) {
    return Promise.reject('Auth error: missing Discord Id')
  }
  return fetchDiscordUser(accessToken, tokenType, true)
    .then((discordUserResponse) => {
      const userPrototype = mapDiscordUserResponseToUserPrototype(discordUserResponse)
      // TODO Add validation on response
      return findUserByDiscordId(discordId)
        .then((user) => updateUserNfts(user).then(() => updateUserDiscordInfo(user.id, userPrototype)))
        .catch(() => addUser(userPrototype))
    })
    .catch(() => Promise.reject('Auth error: error fetching discord user'))
}
